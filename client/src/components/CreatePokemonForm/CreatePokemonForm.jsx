import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPokemon } from "../../redux/actions";
import * as C from "../helpers/const.js";
import * as V from "./variables.js";
import OptionsSelector from "../helpers/OptionsSelector.jsx";
import InputCreator from "../helpers/InputCreator.jsx";

function CreatePokemonForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState(V.inputFormState);
    const [error, setError] = useState(V.errorFormState);

    const onSubmit = async (e) => {
        e.preventDefault();
        let obj = await V.checkFunction(input);
        setError((prevState) => {
            return { ...prevState, ...obj };
        });

        if (obj.state === false) dispatch(createPokemon(input));
    };

    const handleChange = (e) => {
        if (error.state === true) {
            if (V.checkCategorias(e.target.name)) {
                setError({
                    ...error,
                    categorias: "",
                });
            } else {
                setError({
                    ...error,
                    [e.target.name]: "",
                });
            }
        }
        if (e.target.name === "nombre") {
            if (C.onlyLetters(e.target.value)) {
                setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                });
                setError({
                    ...error,
                    nombre: "",
                });
            } else {
                setError({
                    ...error,
                    nombre: "Solo se permiten letras",
                });
            }
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        }

        if (e.target.name === "categoria1") {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
                categorias: [e.target.value, input.categoria2],
            });
        } else if (e.target.name === "categoria2") {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
                categorias: [input.categoria1, e.target.value],
            });
        }
    };

    return (
        <form action="" onSubmit={onSubmit}>
            <InputCreator props={V.inputs.nombre} value={input.nombre} onChange={handleChange} error={error.nombre} />
            <InputCreator props={V.inputs.vida} value={input.vida} onChange={handleChange} error={error.vida} />
            <InputCreator props={V.inputs.fuerza} value={input.fuerza} onChange={handleChange} error={error.fuerza} />
            <InputCreator props={V.inputs.defensa} value={input.defensa} onChange={handleChange} error={error.defensa} />
            <InputCreator props={V.inputs.velocidad} value={input.velocidad} onChange={handleChange} error={error.velocidad} />
            <InputCreator props={V.inputs.altura} value={input.altura} onChange={handleChange} error={error.altura} />
            <InputCreator props={V.inputs.peso} value={input.peso} onChange={handleChange} error={error.peso} />
            <OptionsSelector name="categoria1" labelName="Tipo 1" value={input.categoria1} onChange={handleChange} error={error.categorias} />
            <OptionsSelector name="categoria2" labelName="Tipo 2" value={input.categoria2} onChange={handleChange} error={error.categorias} />
            <InputCreator props={V.inputs.img} value={input.img} onChange={handleChange} error={error.img} />
            <button type="submit">Crear</button>
        </form>
    );
}

export default CreatePokemonForm;

// {
//     /* <label htmlFor="">Nombre </label>
//             <input type="text" name="nombre" placeholder="Nombre..." value={input.nombre} onChange={handleChange} /> */
// }
// {
//     /* {error.nombre !== "" ? <span> {error.nombre}</span> : null} */
// }
// {
//     /* <br /> */
// }
// {
//     /* <label htmlFor="">Vida </label>
//             <input type="range" min="0" max="200" name="vida" placeholder="Puntos de vida..." value={input.vida} onChange={handleChange} />
//             <label htmlFor="">{input.vida}</label>
//             {error.vida !== "" ? <span> {error.vida}</span> : null}
//             <br /> */
// }
// {
//     /* <label htmlFor="">Ataque </label>
//             <input type="range" min="0" max="100" name="fuerza" placeholder="Poder de ataque..." value={input.fuerza} onChange={handleChange} />
//             <label htmlFor="">{input.fuerza}</label>
//             {error.fuerza !== "" ? <span> {error.fuerza}</span> : null}
//             <br />
//             <label htmlFor="">Defensa </label>
//             <input type="range" min="0" max="100" name="defensa" placeholder="Defensa..." value={input.defensa} onChange={handleChange} />
//             <label htmlFor="">{input.defensa}</label>
//             {error.defensa !== "" ? <span> {error.defensa}</span> : null}
//             <br />
//             <label htmlFor="">Velocidad </label>
//             <input type="range" min="0" max="100" name="velocidad" placeholder="Velocidad..." value={input.velocidad} onChange={handleChange} />
//             <label htmlFor="">{input.velocidad}</label>
//             {error.velocidad !== "" ? <span> {error.velocidad}</span> : null}
//             <br /> */
// }
// {
//     /* <label htmlFor="">Altura </label>
//             <input type="number" name="altura" placeholder="Altura en centimetros..." value={input.altura} onChange={handleChange} />
//             {error.altura !== "" ? <span> {error.altura}</span> : null}
//             <br />

//             <label htmlFor="">Peso </label>
//             <input type="number" name="peso" placeholder="Peso en kg..." value={input.name} onChange={handleChange} />
//             {error.peso !== "" ? <span> {error.peso}</span> : null}
//             <br /> */
// }

// {
//     /* <label htmlFor="">Tipo 1 </label>
//             <select name="categoria1" value={input.categoria1} onChange={handleChange}>
//                 <OptionsSelector />
//             </select>
//             {error.categorias !== "" ? <span> {error.categorias}</span> : null}
//             <br />

//             <label htmlFor="">Tipo 2 </label>
//             <select name="categoria2" value={input.categoria2} onChange={handleChange}>
//                 <OptionsSelector />
//             </select>
//             {error.categorias !== "" ? <span> {error.categorias}</span> : null}
//             <br />
//             <label htmlFor="">Url Img </label>
//             <input type="url" name="img" placeholder="Url imagen..." value={input.img} onChange={handleChange} />
//             {error.img !== "" ? <span> {error.img}</span> : null}
//             <br /> */
// }
