const { response, request } = require("express");
const { Pokemon, Type } = require("../db.js");
const { AxiosGetAll, AxiosGetOne } = require("../helpers/axiosGet.js");
const axios = require("axios").default;

const getPokemons = async (req = request, res = response) => {
    const { name } = req.query;

    if (!name) {
        const pokemons = await Pokemon.findAll({
            include: [
                {
                    model: Type,
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!pokemons) {
            await axios
                .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
                .then((response) => {
                    response.data.results.forEach((el) =>
                        axios.get(el.url).then(async (response) => {
                            let poke = response.data;
                            let obj = {
                                nombre: poke.name,
                                pokeid: poke.id,
                                vida: poke.stats[0].base_stat,
                                fuerza: poke.stats[1].base_stat,
                                defensa: poke.stats[2].base_stat,
                                velocidad: poke.stats[5].base_stat,
                                altura: poke.height * 10,
                                peso: poke.weight / 10,
                                categorias: poke.types.map((el) => {
                                    let id = Number(el.type.url.split("/")[6]);
                                    return id;
                                }),
                                img: poke.sprites.other.dream_world.front_default,
                            };
                            let pokemon = await Pokemon.create(obj);
                            pokemon.setTypes(obj.categorias);
                        })
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });

            pokemons = await Pokemon.findAll({
                include: [
                    {
                        model: Type,
                        attributes: ["id", "nombre"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
            return res.json(pokemons);
        }

        return res.json(pokemons);
    } else {
        const pokemon = await Pokemon.findOne({
            where: {
                nombre: name,
            },
            include: [
                {
                    model: Type,
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });

        if (!pokemon) {
            await axios
                .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(async (response) => {
                    let poke = response.data;
                    let obj = {
                        nombre: poke.name,
                        pokeid: poke.id,
                        vida: poke.stats[0].base_stat,
                        fuerza: poke.stats[1].base_stat,
                        defensa: poke.stats[2].base_stat,
                        velocidad: poke.stats[5].base_stat,
                        altura: poke.height * 10,
                        peso: poke.weight / 10,
                        categorias: poke.types.map((el) => {
                            let id = Number(el.type.url.split("/")[6]);
                            return id;
                        }),
                        img: poke.sprites.other.dream_world.front_default,
                    };

                    let pokemon = await Pokemon.create(obj);
                    await pokemon.setTypes(obj.categorias);
                    return res.json(
                        await Pokemon.findOne({
                            where: { nombre: name },
                            include: [
                                {
                                    model: Type,
                                    attributes: ["id", "nombre"],
                                    through: {
                                        attributes: [],
                                    },
                                },
                            ],
                        })
                    );
                })
                .catch(function (error) {
                    return res.status(404).json({ msg: "Pokemon not found" });
                });
        } else {
            return res.json(pokemon);
        }
    }
};

const getPokemons2 = async (req = request, res = response) => {
    const { name } = req.query;

    let pokeapi = [];

    if (!name) {
        let pokemons = await Pokemon.findAll({
            include: [
                {
                    model: Type,
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        pokeapi = await AxiosGetAll(pokeapi);
        pokeresp = pokemons.concat(pokeapi);
        return res.status(200).json(pokeresp);
    } else {
        let pokemon = await Pokemon.findOne({
            where: {
                nombre: name.toLowerCase(),
            },
            include: [
                {
                    model: Type,
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!pokemon) {
            pokemon = await AxiosGetOne(name);
            if (!pokemon.error) {
                res.json(pokemon);
            } else {
                return res.status(404).json({ msg: "Pokemon not found" });
            }
        } else {
            return res.status(200).json(pokemon);
        }
    }
};

const getPokemonById = async (req = request, res = response) => {
    const { idPokemon = "" } = req.params;

    if (idPokemon.includes("-")) {
        let pokemon = await Pokemon.findByPk(idPokemon, {
            include: [
                {
                    model: Type,
                    attributes: ["id", "nombre"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (pokemon) {
            return res.json(pokemon);
        } else {
            return res.status(404).json({ msg: "Pokemon not found" });
        }
    } else {
        let pokemon = await AxiosGetOne(idPokemon);
        if (!pokemon.error) {
            res.json(pokemon);
        } else {
            return res.status(404).json({ msg: "Pokemon not found" });
        }
    }
};

const createPokemon = async (req = request, res = response) => {
    let { nombre, vida, fuerza, defensa, velocidad, altura, peso, categorias, img, created } = req.body;

    if (!nombre) res.status(404).json({ msg: "El nombre es obligatorio" });

    let cat1 = categorias[0];
    let cat2 = categorias[1];

    console.log(cat1 !== "", cat2 !== "");

    if (cat1 !== "" && cat2 === "") {
        categorias = [cat1];
    } else if (cat2 !== "" && cat1 === "") {
        categorias = [cat2];
    }

    const pokemon = await Pokemon.create({
        nombre: nombre.toLowerCase(),
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        img,
        created,
    });

    await pokemon.setTypes(categorias);
    const respuesta = await Pokemon.findOne({
        where: { nombre: nombre.toLowerCase() },
        include: [
            {
                model: Type,
                attributes: ["id", "nombre"],
                through: {
                    attributes: [],
                },
            },
        ],
    });

    res.json(respuesta);
};

const checkNameInDb = async (req = request, res = response) => {
    const { name } = req.query;

    if (!name) {
        res.status(404).json({ msg: "Es necesario un nombre para hacer una consulta" });
    } else {
        const nombre = name.toLowerCase();
        let pokemon = await Pokemon.findOne({ where: { nombre } });
        if (pokemon) {
            return res.status(200).json({ msg: true });
        } else return res.status(200).json({ msg: false });
    }
};

const deletePokemon = async (req = request, res = response) => {
    const { idPokemon = "" } = req.params;

    const pokemon = await Pokemon.findByPk(idPokemon);
    if (pokemon) {
        await pokemon.destroy();
        res.json(pokemon);
    } else {
        return res.status(404).json({ msg: "Pokemon not found" });
    }
};

const editPokemon = async (req = request, res = response) => {
    let { nombre, vida, fuerza, defensa, velocidad, altura, peso, categorias, img, created } = req.body;
    const { idPokemon = "" } = req.params;
    const pokemon = await Pokemon.findByPk(idPokemon);

    if (!nombre) res.status(404).json({ msg: "El nombre es obligatorio" });

    let cat1 = categorias[0];
    let cat2 = categorias[1];

    console.log(cat1 !== "", cat2 !== "");

    if (cat1 !== "" && cat2 === "") {
        categorias = [cat1];
    } else if (cat2 !== "" && cat1 === "") {
        categorias = [cat2];
    }

    await pokemon.update({
        nombre: nombre.toLowerCase(),
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        img,
        created,
    });

    await pokemon.setTypes(categorias);
    const respuesta = await Pokemon.findOne({
        where: { nombre: nombre.toLowerCase() },
        include: [
            {
                model: Type,
                attributes: ["id", "nombre"],
                through: {
                    attributes: [],
                },
            },
        ],
    });

    res.json(respuesta);
};

module.exports = {
    getPokemons,
    getPokemonById,
    createPokemon,
    checkNameInDb,
    deletePokemon,
    editPokemon,
    getPokemons2,
};
