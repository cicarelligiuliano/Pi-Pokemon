import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.scss";
import { typeColor } from "../helpers/const";
import FoundColor from "../helpers/FoundColor";

function PokemonCard(props) {
    let color = typeColor[props.types[0].nombre];

    return (
        <div className="cardContainer">
            <div
                className="commonCard"
                style={{
                    background: ` radial-gradient(circle at 50% 0%, ${color} 50%, #ffffff 36%) `,
                    border: `2px ${color} solid`,
                }}
            >
                <Link to={`/pokemon/${props.id}`} className="linkCard" />
                <div className="effect"></div>

                <h2 className="name">{props.nombre[0].toUpperCase() + props.nombre.slice(1, props.nombre.length + 1)}</h2>

                <img className="img" src={`${props.img}`} alt="Pokemon img" />

                <div className="types">
                    {props.types.map((el) => (
                        <FoundColor {...el} key={`${props.id}${el.id}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;
