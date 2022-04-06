import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getPokemonByName, ClearPokemon, filterByName } from "../../redux/actions";
import FilterBar from "../FilterBar/FilterBar";
import "./Home.scss";
import PokemonCard from "../PokemonCard/PokemonCard";
import ErrorPage from "../helpers/ErrorPage";
import LoadingPage from "../helpers/LoadingPage";

function Home() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        state: false,
        msg: "",
    });
    const pokemon = useSelector((state) => state.pokemon);
    const pokemons = useSelector((state) => state.pokemons);

    const onSubmit = (e) => {
        e.preventDefault();

        let $input = document.getElementById("inputBuscar");
        if ($input.classList.contains("NoEntry")) {
            $input.classList.remove("NoEntry");
        }

        if (input === "") {
            if (!$input.classList.contains("NoEntry")) {
                $input.classList.add("NoEntry");
            }
            setError({
                state: true,
                msg: "Ingrese un nombre",
            });
        } else {
            dispatch(ClearPokemon());
            dispatch(getPokemonByName(input.toLowerCase()));
            dispatch(filterByName(input.toLowerCase()));
            setTodos(false);
            setLoading(true);
            setError({
                state: false,
                msg: "",
            });
        }
    };

    if ((pokemon.msg || error.msg) && loading) {
        setLoading(false);
    }

    useEffect(() => {
        if (pokemons.length === 0) {
            dispatch(getAllPokemons());
        }

        dispatch(ClearPokemon());

        return () => {
            dispatch(ClearPokemon());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        e.preventDefault();
        let $input = document.getElementById("inputBuscar");
        if (/([a-z*A-Z])/.test(e.target.value[e.target.value.length - 1]) || e.target.value === "") {
            setInput(e.target.value);
            if ($input.classList.contains("NoEntry")) {
                $input.classList.remove("NoEntry");
            }
            setError({
                state: false,
                msg: "",
            });
        } else {
            if (!$input.classList.contains("NoEntry")) {
                $input.classList.add("NoEntry");
            }
            setError({
                state: true,
                msg: "Solo se permiten letras",
            });
        }
    };

    const handleVerTodos = (e) => {
        setTodos(true);
        setError({
            state: false,
            msg: "",
        });
        dispatch(ClearPokemon());
        setLoading(false);
    };

    return (
        <div className="HomeContainer">
            <form action="/" method="get" onSubmit={(e) => onSubmit(e)} className="SearchBar">
                <label htmlFor="buscar-pokemon" className="SearchBar__label">
                    Search Pokemon
                </label>
                <input
                    className="input"
                    type="text"
                    id="inputBuscar"
                    name="input"
                    placeholder="Pokemon name..."
                    value={input}
                    onChange={(e) => handleChange(e)}
                ></input>
                <br />
                <div className="SearchBar__buttons">
                    <button type="submit" name="buscar" className="SearchBar__buttons-button searchButton">
                        Search
                    </button>
                    <button type="reset" onClick={handleVerTodos} className="SearchBar__buttons-button allButton">
                        All
                    </button>
                    <br />
                </div>
            </form>

            <div className="Deck">
                <div className="deck">
                    {pokemons.length !== 0 && !pokemon.nombre && !pokemon.msg && !loading
                        ? pokemons.map((el) => {
                              if (el.hide === false) {
                                  return <PokemonCard {...el} key={el.id} />;
                              } else return null;
                          })
                        : null}
                    {pokemon.nombre ? <PokemonCard {...pokemon} key={pokemon.id} /> : null}
                </div>

                {pokemons.length === 0 ? <LoadingPage /> : null}
                {!pokemon.msg && !pokemon.nombre && loading ? <LoadingPage /> : null}
                {pokemon.msg && !loading && <ErrorPage />}
            </div>
            {todos ? <FilterBar pokemons={pokemons} /> : null}
        </div>
    );
}

export default Home;
