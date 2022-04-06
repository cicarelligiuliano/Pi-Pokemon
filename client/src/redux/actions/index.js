import { orderBy, pageFilter } from "../helpers/helpers";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const FILTER = "FILTER";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const CLEAR_POKEMON = "CLEAR_POKEMON";
export const EDIT_POKEMON = "EDIT_POKEMON";

const BaseUrl = process.env.REACT_APP_BASE_URL;

export const getAllPokemons = () => (dispatch) => {
    return fetch(`${BaseUrl}/pokemons`)
        .then((res) => res.json())
        .then((json) => {
            json = orderBy(json, "byNameAsc");
            json = pageFilter(json, 0);
            dispatch({ type: GET_ALL_POKEMONS, payload: json });
        });
};

export const getPokemonByName = (name) => (dispatch) => {
    return fetch(`${BaseUrl}/pokemons?name=${name}`)
        .then((res) => res.json())
        .then((json) => dispatch({ type: GET_POKEMON_BY_NAME, payload: json }));
};

export const getPokemonById = (id) => (dispatch) => {
    return fetch(`${BaseUrl}/pokemons/${id}`)
        .then((res) => res.json())
        .then((json) => dispatch({ type: GET_POKEMON_BY_ID, payload: json }));
};

export const createPokemon = (data) => (dispatch) => {
    return fetch(`${BaseUrl}/pokemons`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((json) => dispatch({ type: CREATE_POKEMON, payload: json }));
};

export const editPokemon = (data) => (dispatch) => {
    return fetch(`${BaseUrl}/pokemons/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((json) => dispatch({ type: EDIT_POKEMON, payload: json }));
};

export const deletePokemon = (id) => (dispatch) => {
    return fetch(`${BaseUrl}/pokemons/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((json) => dispatch({ type: DELETE_POKEMON, payload: json }));
};

export const filterAll = (payload) => {
    return { type: FILTER, payload: payload };
};
export const filterByName = (payload) => {
    return { type: FILTER_BY_NAME, payload: payload };
};

export const ClearPokemon = () => {
    return { type: CLEAR_POKEMON, payload: {} };
};
