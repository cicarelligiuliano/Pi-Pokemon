import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePokemon } from "../../redux/actions";
import "./PokemonDetailsCard.css";
import { typeColor } from "../helpers/const";
import FoundColor from "../helpers/FoundColor";

function PokemonDetailsCard(props) {
  const dispatch = useDispatch();
  let color = typeColor[props.types[0].nombre];

  return (
    <div
      className="cardDetail"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${color} 50%, #ffffff 36%)`,
      }}
    >
      <div className="header">
        <button
          onClick={() => dispatch(deletePokemon(props.id))}
          className="buttonX"
        >
          X
        </button>
        <p className="hp">
          <span>HP </span>
          {props.vida}
        </p>
      </div>

      <Link to={`/pokemon/${props.id}`} className="link">
        <h2 className="name">
          {props.nombre[0].toUpperCase() +
            props.nombre.slice(1, props.nombre.length + 1)}
        </h2>
      </Link>
      <div>
        <img className="img" src={`${props.img}`} alt="Pokemon img" />
      </div>
      <div className="types">
        {props.types.map((el) => (
          <FoundColor {...el} key={`${props.id}${el.id}`} />
        ))}
      </div>
      <div className="stats">
        <div className="caract">
          <span>Ataque</span>
          <p>{props.fuerza}</p>
        </div>
        <div className="caract">
          <span>Defensa</span>
          <p>{props.defensa}</p>
        </div>
        <div className="caract">
          <span>Velocidad</span>
          <p>{props.velocidad}</p>
        </div>
      </div>
      <div className="alt">
        <div className="caract">
          <span>Altura</span>
          <p>{props.altura}cm</p>
        </div>
        <div className="caract">
          <span>Peso</span>
          <p>{props.peso}kg</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailsCard;
