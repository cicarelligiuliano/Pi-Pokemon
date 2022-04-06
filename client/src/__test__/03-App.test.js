import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import * as data from "../../db.json";
import App from "../App";
import Nav from "../components/Nav/Nav";
import Pokedex from "../components/Pokedex/Pokedex";
import Home from "../components/Home/Home";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";
import CreatePokemonForm from "../components/CreatePokemonForm/CreatePokemonForm";

configure({ adapter: new Adapter() });

describe("<App />", () => {
    let store;
    const routes = ["/", "/home", "/pokemon/create", "/pokemon/:1"];
    const mockStore = configureStore([thunk]);
    const state = {
        pokemons: data.pokemons,
        pokemon: data.pokemons[0],
    };

    beforeEach(() => {
        store = mockStore(state);
    });

    const componentToUse = (route) => {
        return (
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
    };

    describe("El componente Nav debe ser renderizado en todas las rutas menos en '/'", () => {
        it('Debería ser renderizado en la ruta "/home"', () => {
            const app = mount(componentToUse(routes[1]));
            expect(app.find(Nav)).toHaveLength(1);
        });

        it('Debería ser renderizado en la ruta "/pokemon/create"', () => {
            const app = mount(componentToUse(routes[2]));
            expect(app.find(Nav)).toHaveLength(1);
        });

        it('Debería ser renderizado en la ruta "/pokemon/:1"', () => {
            const app = mount(componentToUse(routes[3]));
            expect(app.find(Nav)).toHaveLength(1);
        });

        it('No debería ser renderizado en la ruta "/"', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Nav)).toHaveLength(0);
        });
    });

    describe("Componenete Pokedex", () => {
        it('El componente "Pokedex" se debería renderizar solamente en la ruta "/"', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Pokedex)).toHaveLength(1);
            expect(app.find(Nav)).toHaveLength(0);
            expect(app.find(PokemonDetails)).toHaveLength(0);
            expect(app.find(CreatePokemonForm)).toHaveLength(0);
            expect(app.find(Home)).toHaveLength(0);
        });
    });
    describe("Componenete Home", () => {
        it('El componente "Home" se debería renderizar solamente en la ruta "/home"', () => {
            const app = mount(componentToUse(routes[1]));
            expect(app.find(Home)).toHaveLength(1);
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(PokemonDetails)).toHaveLength(0);
            expect(app.find(CreatePokemonForm)).toHaveLength(0);
            expect(app.find(Pokedex)).toHaveLength(0);
        });
    });
    describe("Componenete CreatePokemonForm", () => {
        it('El componente "CreatePokemonForm" se debería renderizar solamente en la ruta "/pokemon/create"', () => {
            const app = mount(componentToUse(routes[2]));
            expect(app.find(CreatePokemonForm)).toHaveLength(1);
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(PokemonDetails)).toHaveLength(0);
            expect(app.find(Pokedex)).toHaveLength(0);
            expect(app.find(Home)).toHaveLength(0);
        });
    });
    describe("Componenete PokemonDetails", () => {
        it('El componente "PokemonDetails" se debería renderizar solamente en la ruta "/pokemon/:1"', () => {
            const app = mount(componentToUse(routes[3]));
            expect(app.find(PokemonDetails)).toHaveLength(1);
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(CreatePokemonForm)).toHaveLength(0);
            expect(app.find(Pokedex)).toHaveLength(0);
            expect(app.find(Home)).toHaveLength(0);
        });
    });
});
