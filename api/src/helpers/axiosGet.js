const axios = require("axios").default;
const AxiosGetAll = async (arr = []) => {
    let primerGet = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40");
    let resp = primerGet.data.results.map(async (el) => {
        let segundoGet = await axios.get(el.url);
        let poke = segundoGet.data;
        let obj = {
            nombre: poke.name,
            id: poke.id,
            vida: poke.stats[0].base_stat,
            fuerza: poke.stats[1].base_stat,
            defensa: poke.stats[2].base_stat,
            velocidad: poke.stats[5].base_stat,
            altura: poke.height * 10,
            peso: poke.weight / 10,
            types: poke.types.map((el) => {
                let id = Number(el.type.url.split("/")[6]);
                let nombre = el.type.name;
                return { id, nombre };
            }),
            img: poke.sprites.other.dream_world.front_default,
            hide: false,
            created: false,
        };
        return obj;
    });
    return Promise.all(resp);
};

const AxiosGetOne = async (name) => {
    try {
        let primerGet = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let poke = primerGet.data;
        let obj = {
            nombre: poke.name,
            id: poke.id,
            vida: poke.stats[0].base_stat,
            fuerza: poke.stats[1].base_stat,
            defensa: poke.stats[2].base_stat,
            velocidad: poke.stats[5].base_stat,
            altura: poke.height * 10,
            peso: poke.weight / 10,
            types: poke.types.map((el) => {
                let id = Number(el.type.url.split("/")[6]);
                let nombre = el.type.name;
                return { id, nombre };
            }),
            img: poke.sprites.other.dream_world.front_default,
            hide: false,
            created: false,
        };
        return obj;
    } catch (error) {
        return {error:true};
    }
};

module.exports = {
    AxiosGetAll,
    AxiosGetOne,
};
