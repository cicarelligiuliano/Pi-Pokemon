import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByName, getAllPokemons, getPokemonByName } from "../../redux/actions";
import PokemonDeck from "../PokemonDeck/PokemonDeck";
import FilterBar from "../FilterBar/FilterBar";

function SearchBar(props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        nombre: "",
    });
    const [todos, setTodos] = useState(false);
    const [error, setError] = useState({
        state: false,
        msg: "",
    });
    const pokemon = useSelector((state) => state.pokemon);

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(input.nombre.toLowerCase()));

        dispatch(filterByName(input.nombre.toLowerCase()));
        setTodos(false);
    };

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    const handleChange = (e) => {
        if (/([a-z*A-Z])/.test(e.target.value[e.target.value.length - 1]) || e.target.value === "") {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
            setError({
                state: false,
                msg: "",
            });
        } else {
            setError({
                state: true,
                msg: "Solo se permiten letras",
            });
        }
    };

    const handleVerTodos = (e) => {
        if (todos) {
            setTodos(false);
            dispatch(filterByName(""));
        } else {
            setTodos(true);
        }
    };

    return (
        <div>
            <form action="/" method="get" onSubmit={onSubmit}>
                <label htmlFor="buscar-pokemon">Buscar Pokemon </label>
                <input type="text" id="nombre" name="nombre" placeholder="Pokemon name..." value={input.nombre} onChange={handleChange}></input>
                <button type="submit">Buscar</button>
                <br />
                {error.state && <span>{error.msg}</span>}
                {pokemon.msg && <span>{pokemon.msg}</span>}
            </form>
            <button onClick={handleVerTodos}>Ver todos</button>
            {todos ? <FilterBar /> : null}
            <PokemonDeck />
        </div>
    );
}

export default SearchBar;
