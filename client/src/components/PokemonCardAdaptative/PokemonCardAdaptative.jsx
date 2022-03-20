import React from "react";
import "./PokemonCardAdaptative.scss";
import FoundColor from "../helpers/FoundColor";

function PokemonCardAdaptative(props) {
    console.log(props.props);
    return (
        <>
            <div className="PokeCard">
                <div className="container">
                    <div className="effect"></div>
                    <div className="card">
                        <div className="name">{props.props.nombre[0].toUpperCase() + props.props.nombre.slice(1, props.props.nombre.length + 1)}</div>
                        <div className="img">
                            <div className="background"></div>
                            <img className="imagen" src={`${props.props.img}`} alt="Pokemon img" />
                        </div>
                        <div className="types">
                            {props.props.types.map((el) => (
                                <FoundColor {...el} key={`${props.props.id}${el.id}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PokemonCardAdaptative;
