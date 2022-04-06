import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import * as data from "../../db.json";

import PokemonDetailsCard from "../components/PokemonDetailsCard/PokemonDetailsCard";

configure({ adapter: new Adapter() });

describe("<CharacterCard />", () => {
    let PokemonCard;
    let [pokemon1, pokemon2, pokemon3] = data.pokemons;

    beforeEach(() => {
        // console.log(pokemon1, pokemon2, pokemon3);
        PokemonCard = (pokemon) =>
            shallow(
                <PokemonDetailsCard
                    key={pokemon.id}
                    id={pokemon.id}
                    vida={pokemon.vida}
                    nombre={pokemon.nombre}
                    fuerza={pokemon.fuerza}
                    defensa={pokemon.defensa}
                    velocidad={pokemon.velocidad}
                    altura={pokemon.altura}
                    peso={pokemon.peso}
                    types={pokemon.types}
                    created={pokemon.created}
                    hide={pokemon.hide}
                    img={pokemon.img}
                />
            );
        expect(isReact.classComponent(PokemonDetailsCard)).toBeFalsy();
    });

    it('Debería renderizar un tag "img" y utilizar como source la imagen del pokemon', () => {
        expect(PokemonCard(pokemon1).find("img").at(0).prop("src")).toEqual(pokemon1.img);
        expect(PokemonCard(pokemon2).find("img").at(0).prop("src")).toEqual(pokemon2.img);
        expect(PokemonCard(pokemon3).find("img").at(0).prop("src")).toEqual(pokemon3.img);
    });
    it('Debería div con la clase "name" y con el nombre del pokemon con la primer letra mayusculas', () => {
        expect(PokemonCard(pokemon1).find("div.name").text()).toEqual(pokemon1.nombre[0].toUpperCase() + pokemon1.nombre.slice(1, pokemon1.nombre.length + 1));
        expect(PokemonCard(pokemon2).find("div.name").text()).toEqual(pokemon2.nombre[0].toUpperCase() + pokemon2.nombre.slice(1, pokemon2.nombre.length + 1));
        expect(PokemonCard(pokemon3).find("div.name").text()).toEqual(pokemon3.nombre[0].toUpperCase() + pokemon3.nombre.slice(1, pokemon3.nombre.length + 1));
    });
    it("Deberia renderizar una div con clase Types donde se renderizen un elemento por cada tipo", () => {
        expect(PokemonCard(pokemon1).find("div.types").length).toEqual(1);
        expect(PokemonCard(pokemon1).find("div.types").children().length).toEqual(pokemon1.types.length);
    });
    it("Deberia renderizar un div con clase stat para cada uno de los stats", () => {
        expect(PokemonCard(pokemon1).find("div.stat").length).toEqual(6);
    });
    it('El primer Div.stat debe tener un span que muestre "HP" y un <p></p> que muestre el valor de la vida', () => {
        expect(PokemonCard(pokemon1).find("div.stat").at(0).children().length).toEqual(2);
        expect(PokemonCard(pokemon1).find("div.stat").at(0).childAt(0).type()).toEqual("span");
        expect(PokemonCard(pokemon1).find("div.stat").at(0).childAt(0).text()).toEqual("HP");
        expect(PokemonCard(pokemon1).find("div.stat").at(0).childAt(1).type()).toEqual("p");
        expect(PokemonCard(pokemon1).find("div.stat").at(0).childAt(1).text()).toEqual(String(pokemon1.vida));
    });
    it('El segundo Div.stat debe tener un span que muestre "Height" y un <p></p> que muestre el valor de la (altura)cm', () => {
        expect(PokemonCard(pokemon1).find("div.stat").at(1).children().length).toEqual(2);
        expect(PokemonCard(pokemon1).find("div.stat").at(1).childAt(0).type()).toEqual("span");
        expect(PokemonCard(pokemon1).find("div.stat").at(1).childAt(0).text()).toEqual("Height");
        expect(PokemonCard(pokemon1).find("div.stat").at(1).childAt(1).type()).toEqual("p");
        expect(PokemonCard(pokemon1).find("div.stat").at(1).childAt(1).text()).toEqual(String(pokemon1.altura + "cm"));
    });
    it('El tercer Div.stat debe tener un span que muestre "Weight" y un <p></p> que muestre el valor del (peso)kg', () => {
        expect(PokemonCard(pokemon1).find("div.stat").at(2).children().length).toEqual(2);
        expect(PokemonCard(pokemon1).find("div.stat").at(2).childAt(0).type()).toEqual("span");
        expect(PokemonCard(pokemon1).find("div.stat").at(2).childAt(0).text()).toEqual("Weight");
        expect(PokemonCard(pokemon1).find("div.stat").at(2).childAt(1).type()).toEqual("p");
        expect(PokemonCard(pokemon1).find("div.stat").at(2).childAt(1).text()).toEqual(String(pokemon1.peso + "kg"));
    });
    it('El cuarto Div.stat debe tener un span que muestre "Attack" y un <p></p> que muestre el valor del ataque', () => {
        expect(PokemonCard(pokemon1).find("div.stat").at(3).children().length).toEqual(2);
        expect(PokemonCard(pokemon1).find("div.stat").at(3).childAt(0).type()).toEqual("span");
        expect(PokemonCard(pokemon1).find("div.stat").at(3).childAt(0).text()).toEqual("Attack");
        expect(PokemonCard(pokemon1).find("div.stat").at(3).childAt(1).type()).toEqual("p");
        expect(PokemonCard(pokemon1).find("div.stat").at(3).childAt(1).text()).toEqual(String(pokemon1.fuerza));
    });
    it('El quinto Div.stat debe tener un span que muestre "Defense" y un <p></p> que muestre el valor del a vida', () => {
        expect(PokemonCard(pokemon1).find("div.stat").at(4).children().length).toEqual(2);
        expect(PokemonCard(pokemon1).find("div.stat").at(4).childAt(0).type()).toEqual("span");
        expect(PokemonCard(pokemon1).find("div.stat").at(4).childAt(0).text()).toEqual("Defense");
        expect(PokemonCard(pokemon1).find("div.stat").at(4).childAt(1).type()).toEqual("p");
        expect(PokemonCard(pokemon1).find("div.stat").at(4).childAt(1).text()).toEqual(String(pokemon1.defensa));
    });
    it('El sexto Div.stat debe tener un span que muestre "Speed" y un <p></p> que muestre el valor de la velocidad', () => {
        expect(PokemonCard(pokemon1).find("div.stat").at(5).children().length).toEqual(2);
        expect(PokemonCard(pokemon1).find("div.stat").at(5).childAt(0).type()).toEqual("span");
        expect(PokemonCard(pokemon1).find("div.stat").at(5).childAt(0).text()).toEqual("Speed");
        expect(PokemonCard(pokemon1).find("div.stat").at(5).childAt(1).type()).toEqual("p");
        expect(PokemonCard(pokemon1).find("div.stat").at(5).childAt(1).text()).toEqual(String(pokemon1.velocidad));
    });
});
