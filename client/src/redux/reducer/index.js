// Importa las actions types que necesites acá:
import {
  GET_ALL_POKEMONS,
  CREATE_POKEMON,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_BY_ID,
  DELETE_POKEMON,
  FILTER,
  FILTER_BY_NAME,
} from "../actions/index";
import {
  filterBy,
  orderBy,
  pageFilter,
  filterByName,
} from "../helpers/helpers";

const initialState = {
  pokemons: [],
  pokemon: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemon: action.payload,
      };
    case GET_POKEMON_BY_ID:
      
      return {
        ...state,
        pokemon: action.payload,
      };
    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter((c) => c.id !== action.payload),
      };
    case FILTER:
      const { which, type = "all", order, page } = action.payload;
      let poke = state.pokemons.map((el) => filterBy(el, which, type));
      poke = orderBy(poke, order);
      poke = pageFilter(poke, page);
      return {
        ...state,
        pokemons: poke,
      };
    case FILTER_BY_NAME:
      let name = action.payload;
      let pokem = state.pokemons.map((el) => filterByName(el, name));
      return {
        ...state,
        pokemons: pokem,
      };

    default:
      return state;
  }
};

export default rootReducer;
