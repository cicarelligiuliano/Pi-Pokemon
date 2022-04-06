import React from "react";
import { Link } from "react-router-dom";
import { typeColor } from "../../helpers/const";
import FoundColor from "../../helpers/FoundColor";

function PokeFormCard({ props }) {
    let color = typeColor[props.types[0].nombre];

    return (
        <div className="PokeFormCard">
            <div
                className="frontCard"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${color} 50%, #eee 36%)`,
                }}
            >
                <Link to={`/pokemon/${props.id}`} className="linkCard" />
                <div className="effect"></div>
                <div className="hp">
                    <span>HP </span>
                    <p>{props.vida}</p>
                </div>
                <div className="nombre">{props.nombre[0].toUpperCase() + props.nombre.slice(1, props.nombre.length + 1)}</div>
                <div className="imagen">
                    <img src={props.img} alt="" />
                </div>
                <div className="types">
                    {props.types.map((el) => (
                        <FoundColor {...el} key={`${props.id}${el.id}`} />
                    ))}
                </div>
                <div className="stats">
                    <div className="top">
                        <div className="stat">
                            <span>Ataque</span>
                            <p>{props.fuerza}</p>
                        </div>
                        <div className="stat">
                            <span>Defensa</span>
                            <p>{props.defensa}</p>
                        </div>
                        <div className="stat">
                            <span>Velocidad</span>
                            <p>{props.velocidad}</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="stat">
                            <span>Altura</span>
                            <p>{props.altura}cm</p>
                        </div>
                        <div className="stat">
                            <span>Peso</span>
                            <p>{props.peso}kg</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backCard"></div>
        </div>
    );
}

export default PokeFormCard;
