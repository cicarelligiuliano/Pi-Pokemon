const server = require('./src/app.js');
const { conn, Pokemon, Type } = require('./src/db.js');
const axios = require('axios').default;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(process.env.PORT || 5000, async () => {
        console.log('Servidor levantado en puerto 3001'); // eslint-disable-line no-console
        let types = await Type.findAll();
        if (types.length === 0) {
            await axios
                .get('https://pokeapi.co/api/v2/type')
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
        }

        await axios
            .get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40')
            .then((response) => {
                response.data.results.forEach((el) =>
                    axios.get(el.url).then(async (response) => {
                        let poke = response.data;
                        let obj = {
                            nombre: poke.name,
                            vida: poke.stats[0].base_stat,
                            fuerza: poke.stats[1].base_stat,
                            defensa: poke.stats[2].base_stat,
                            velocidad: poke.stats[5].base_stat,
                            altura: poke.height * 10,
                            peso: poke.weight / 10,
                            categorias: poke.types.map((el) => {
                                let id = Number(el.type.url.split('/')[6]);
                                return id;
                            }),
                            img: poke.sprites.other.dream_world.front_default,
                        };

                        let exists = await Pokemon.findOne({ where: { nombre: obj.nombre } });
                        if (!exists) {
                            let pokemon = await Pokemon.create(obj);
                            pokemon.setTypes(obj.categorias);
                        }
                    })
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    });
});
