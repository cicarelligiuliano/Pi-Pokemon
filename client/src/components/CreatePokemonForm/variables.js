// import { getPokemonByName } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import React from "react";

const BaseUrl = process.env.REACT_APP_BASE_URL;

export const inputFormState = {
    nombre: "",
    vida: "100",
    fuerza: "50",
    defensa: "50",
    velocidad: "50",
    altura: "100",
    peso: "100",
    img: "",
    categoria1: "",
    categoria2: "",
    categorias: ["", ""],
    created: true,
};

export const errorFormState = {
    state: false,
    nombre: false,
    img: false,
    categorias: false,
};

export const checkFunction = async (input) => {
    let obj = {
        state: false,
        nombre: false,
        img: false,
        categorias: false,
    };
    if (!input.nombre) {
        obj.nombre = true;
        obj.state = true;
    }
    if (input.nombre) {
        let { msg } = await checkNameInDb(input.nombre);
        if (msg) {
            obj.nombre = true;
            obj.state = true;
        }
    }
    if (!input.categoria1 && !input.categoria2) {
        obj.categorias = true;
        obj.state = true;
    }
    if (input.categoria1 === input.categoria2) {
        obj.categorias = true;
        obj.state = true;
    }
    if (!input.img) {
        obj.img = true;
        obj.state = true;
    }
    if (input.img) {
        if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(input.img)) {
            obj.img = true;
            obj.state = true;
        }
        if (!/(.img)|(.svg)|(.png)|(.jpg)|(.gif)/.test(input.img)) {
            obj.img = true;
            obj.state = true;
        }
    }

    return obj;
};

export const checkCategorias = (name) => {
    if (name === "categoria1" || name === "categoria2") {
        return true;
    } else return false;
};

export const checkNameInDb = async (name) => {
    let res = await fetch(`${BaseUrl}/pokemon/check?name=${name}`)
        .then((res) => res.json())
        .then((json) => json);
    return res;
};

export const inputs = {
    nombre: {
        type: "text",
        name: "nombre",
        labelName: "Nombre",
        placeHolder: "Nombre...",
    },
    vida: {
        type: "range",
        name: "vida",
        min: "0",
        max: "200",
        labelName: "Vida",
    },
    fuerza: {
        type: "range",
        name: "fuerza",
        min: "0",
        max: "100",
        labelName: "Ataque",
    },
    defensa: {
        type: "range",
        name: "defensa",
        min: "0",
        max: "100",
        labelName: "Defensa",
    },
    velocidad: {
        type: "range",
        name: "velocidad",
        min: "0",
        max: "100",
        labelName: "Velocidad",
    },
    altura: {
        type: "range",
        name: "altura",
        min: "0",
        max: "200",
        labelName: "Altura",
        unit: "cm",
    },
    peso: {
        type: "range",
        name: "peso",
        min: "0",
        max: "200",
        labelName: "Peso",
        unit: "Kg",
    },
    img: {
        type: "url",
        name: "img",
        labelName: "Url imagen",
        placeHolder: "Url de imagen...",
    },
};
