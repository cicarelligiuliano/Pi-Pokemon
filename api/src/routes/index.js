const { Router } = require("express");
const {
  getPokemons,
  getPokemonById,
  createPokemon,
  checkNameInDb
} = require("../controllers/pokemons");
const { getTypes } = require("../controllers/types");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPokemons);

router.get("/pokemons/:idPokemon", getPokemonById);

router.post("/pokemons", createPokemon);

router.get("/types", getTypes);

router.get("/pokemon/check", checkNameInDb)

module.exports = router;
