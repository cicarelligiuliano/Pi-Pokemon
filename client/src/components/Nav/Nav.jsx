import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const Nav = (props) => {
    return (
        <nav className="navbar">
            <div className="navcontainer">
                <div className="logo"></div>
                <Link to="/home" className="home">
                    Home
                </Link>

                <Link to="/pokemon/create" className="create">
                    Create Pokemon
                </Link>
                
            </div>
        </nav>
    );
};

export default Nav;
