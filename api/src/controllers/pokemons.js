const { response, request } = require("express");
const { Pokemon, Type } = require("../db.js");
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
                        img: poke.sprites.other.home.front_default,
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

const getPokemonById = async (req = request, res = response) => {
    const { idPokemon = "" } = req.params;

    if (idPokemon.includes("-")) {
        const pokemon = await Pokemon.findByPk(idPokemon, {
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
        if (pokemon) return res.json(pokemon);
    } else {
        let pokeDB = await Pokemon.findOne({
            where: { pokeid: idPokemon },
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
        if (pokeDB) return res.json(pokeDB);

        await axios
            .get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
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
                    img: poke.sprites.other.home.front_default,
                };

                let pokemon = await Pokemon.create(obj);
                await pokemon.setTypes(obj.categorias);
                return res.json(
                    await Pokemon.findOne({
                        where: { pokeid: idPokemon },
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
    }
};

const createPokemon = async (req = request, res = response) => {
    const { nombre, vida, fuerza, defensa, velocidad, altura, peso, categorias, img, created } = req.body;

    if (!nombre) res.status(404).json({ msg: "El nombre es obligatorio" });

    console.log(nombre.toLowerCase());

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
        where: { nombre },
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

module.exports = {
    getPokemons,
    getPokemonById,
    createPokemon,
    checkNameInDb,
};
