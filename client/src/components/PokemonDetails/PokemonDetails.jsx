import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePokemon, getPokemonById } from "../../redux/actions";
import PokemonDetailsCard from "../PokemonDetailsCard/PokemonDetailsCard";
import "./PokemonDetails.scss";
import LoadingPage from "../helpers/LoadingPage";
import ErrorPage from "../helpers/ErrorPage";
function PokemonDetails(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const pokemon = useSelector((state) => state.pokemon);
    const params = useParams();
    const { idPokemon } = params;
    console.log(pokemon);

    const handleDelete = () => {
        dispatch(deletePokemon(pokemon.id));
        setTimeout(() => {
            history.push("/home");
        }, 500);
    };

    useEffect(() => {
        dispatch(getPokemonById(idPokemon));
    }, [dispatch, idPokemon]);

    return (
        <div className="DetailsContainer">
            <div className="ControlButtons">
                <div className="ButtonContainer">
                    <Link to={`/home`} className="link">
                        <button>← Back</button>
                    </Link>
                </div>
                <div className="ButtonContainer">{pokemon.created ? <button onClick={handleDelete}>Delete</button> : null}</div>
            </div>
            <div className="CardDetail">
                {pokemon.nombre && !pokemon.msg ? <PokemonDetailsCard {...pokemon} /> : null}
                {pokemon.msg && !pokemon.nombre ? <ErrorPage /> : null}
                {!pokemon.nombre && !pokemon.msg ? <LoadingPage /> : null}
            </div>
        </div>
    );  
}

export default PokemonDetails;
