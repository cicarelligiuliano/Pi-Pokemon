import React from "react";
import "./Pokedex.scss";
import { Link } from "react-router-dom";

function Pokedex() {
    

    return (
        <>
            <div className="Pokecontainer">
                <div className="container">
                    <div className="pokedex">
                        <div className="panel leftSide">
                            <div className="bigLed"></div>
                            <div className="redLed"></div>
                            <div className="yellowLed"></div>
                            <div className="greenLed"></div>
                            <div className="screen"></div>
                        </div>

                        <div className="mitad">
                            <div className="panel rightSide">
                                <div className="front">
                                    <div className="ledAmarillo"></div>

                                    <div className="enterButton">
                                        <Link to="/home" className="enter"></Link>
                                    </div>
                                </div>
                                <div className="back"></div>
                                <div className="right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Pokedex;
