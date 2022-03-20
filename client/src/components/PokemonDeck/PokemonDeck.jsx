import React from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonDeck.css";

function PokemonDeck(props) {
  const pokemons = useSelector((state) => state.pokemons);

  return (
    <div>
      <div>Pokemon Deck</div>
      <div className="deck">
        {pokemons &&
          pokemons.map((el) => {
            if (el.hide === false) {
              return <PokemonCard {...el} key={el.id} />;
            } else return null;
          })}
      </div>
    </div>
  );
}

export default PokemonDeck;
