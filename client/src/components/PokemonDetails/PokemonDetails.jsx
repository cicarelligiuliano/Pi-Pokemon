import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions";
import PokemonDetailsCard from "../PokemonDetailsCard/PokemonDetails";

function PokemonDetails(props) {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const params = useParams();
  const { idPokemon } = params;
  useEffect(() => {
    dispatch(getPokemonById(idPokemon));
  }, [dispatch, idPokemon]);

  return <div>{pokemon.nombre && <PokemonDetailsCard {...pokemon} />}</div>;
}

export default PokemonDetails;
