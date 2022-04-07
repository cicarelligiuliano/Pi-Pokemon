const { response, request } = require("express");
const { Pokemon, Type } = require("../db.js");
const axios = require("axios").default;

const getTypes = async (req = request, res = response) => {
    const types = await Type.findAll();

    if (!types) {
        await axios
            .get("https://pokeapi.co/api/v2/type")
            .then((response) => {
                response.data.results.forEach((el) =>
                    Type.create({
                        nombre: el.name,
                    })
                );
            })
            .catch(function (error) {
                console.log(error);
            });

        types = await Type.findAll();
    }

    res.json(types);
};

module.exports = {
    getTypes,
};
