const { Router } = require("express");

const { getPokemons2, getPokemonById, createPokemon, checkNameInDb, deletePokemon, editPokemon } = require("../controllers/pokemons");
const { getTypes } = require("../controllers/types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPokemons2);

router.get("/pokemons/:idPokemon", getPokemonById);

router.post("/pokemons", createPokemon);

router.get("/types", getTypes);

router.get("/pokemon/check", checkNameInDb);

router.delete("/pokemons/:idPokemon", deletePokemon);

router.put("/pokemons/:idPokemon", editPokemon);

module.exports = router;
