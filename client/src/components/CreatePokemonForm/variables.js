// import { getPokemonByName } from "../../redux/actions";
// import { useDispatch } from "react-redux";
// import React from "react";

export const inputFormState = {
    nombre: "",
    vida: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    img: "",
    categoria1: "",
    categoria2: "",
    categorias: ["", ""],
    created: true,
};

export const errorFormState = {
    state: false,
    nombre: "",
    vida: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    img: "",
    categorias: "",
};

export const checkFunction = async (input) => {
    let obj = {
        state: false,
        nombre: "",
        vida: "",
        fuerza: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        img: "",
        categorias: "",
    };
    if (!input.nombre) {
        obj.nombre = "Por favor ingrese un nombre";
        obj.state = true;
    }
    if (input.nombre) {
        let { msg } = await checkNameInDb(input.nombre);
        if (msg) {
            obj.nombre = "Ingrese otro nombre";
            obj.state = true;
        }
    }
    if (!input.vida) {
        obj.vida = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.fuerza) {
        obj.fuerza = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.defensa) {
        obj.defensa = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.velocidad) {
        obj.velocidad = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.altura) {
        obj.altura = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.peso) {
        obj.peso = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.categoria1 && !input.categoria2) {
        obj.categorias = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (!input.img) {
        obj.img = "Por favor ingrese un valor";
        obj.state = true;
    }
    if (input.img) {
        if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(input.img)) {
            obj.img = "Por favor ingrese un pagina valida";
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
    let res = await fetch(`http://localhost:3001/pokemon/check?name=${name}`)
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
        labelName: "Vida",
    },
    velocidad: {
        type: "range",
        name: "velocidad",
        min: "0",
        max: "100",
        labelName: "Velocidad",
    },
    altura: {
        type: "number",
        name: "altura",
        labelName: "Altura",
        placeHolder: "Altura en centimetros...",
    },
    peso: {
        type: "number",
        name: "peso",
        labelName: "Peso",
        placeHolder: "Peso en kg...",
    },
    img: {
        type: "url",
        name: "img",
        labelName: "Url imagen",
        placeHolder: "Url de imagen...",
    },
};