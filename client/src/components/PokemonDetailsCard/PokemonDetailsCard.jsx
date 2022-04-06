import React from "react";
import "./PokemonDetailsCard.scss";
import { typeColor } from "../helpers/const";
import FoundColor from "../helpers/FoundColor";

function PokemonDetailsCard(props) {
    let color = typeColor[props.types[0].nombre];
    

    return (
        <div className="cardDetailContainer">
            <div
                className="imagen"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${color} 50%, #ffffff 36%)`,
                }}
            >
                <img className="img" src={`${props.img}`} alt="Pokemon img" />
            </div>
            <div className="details">
                <div className="nameContainer">
                    <div className="name">{props.nombre[0].toUpperCase() + props.nombre.slice(1, props.nombre.length + 1)}</div>
                </div>

                <div className="types">
                    {props.types.map((el) => (
                        <FoundColor {...el} key={`${props.id}${el.id}`} />
                    ))}
                </div>
                <div className="stats">
                    <div className="left">
                        <div className="stat">
                            <span>HP</span>
                            <p>{props.vida}</p>
                        </div>
                        <div className="stat">
                            <span>Height</span>
                            <p>{props.altura}cm</p>
                        </div>
                        <div className="stat">
                            <span>Weight</span>
                            <p>{props.peso}kg</p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="stat">
                            <span>Attack</span>
                            <p>{props.fuerza}</p>
                        </div>
                        <div className="stat">
                            <span>Defense</span>
                            <p>{props.defensa}</p>
                        </div>
                        <div className="stat">
                            <span>Speed</span>
                            <p>{props.velocidad}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetailsCard;
