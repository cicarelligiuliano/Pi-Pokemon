import React from "react";
import { Link } from "react-router-dom";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import Nav from "../components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("<Nav />", () => {
    let nav;
    beforeEach(() => {
        nav = shallow(<Nav />);
        expect(isReact.classComponent(Nav)).toBeFalsy();
    });

    it('Debería renderizar dos <Link to="" />. El primero que vaya a "/home", y el segundo a "/pokemon/create"', () => {
        expect(nav.find(Link).length).toBeGreaterThanOrEqual(2);
    });

    it('Debería tener un Link con el texto "Home" que cambie la ruta hacia "/home"', () => {
        expect(nav.find(Link).at(0).prop("to")).toEqual("/home");
        expect(nav.find(Link).at(0).text()).toEqual("Home");
    });

    it('Debería tener un segundo Link, con texto "Create Pokemon" y que cambie la ruta hacia "/house/create"', () => {
        expect(nav.find(Link).at(1).prop("to")).toEqual("/pokemon/create");
        expect(nav.find(Link).at(1).text()).toEqual("Create Pokemon");
    });

    it('Debería tener un div con una clase "logo" para mostrar el logo"', () => {
        expect(nav.find("div.logo").length).toBeGreaterThanOrEqual(1);
    });
});
