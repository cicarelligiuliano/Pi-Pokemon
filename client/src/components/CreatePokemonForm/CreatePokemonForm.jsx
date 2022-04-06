import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearPokemon, createPokemon } from "../../redux/actions";
import * as C from "../helpers/const.js";
import * as V from "./variables.js";
import OptionsSelector from "../helpers/OptionsSelector.jsx";
import InputCreator from "../helpers/InputCreator.jsx";
import "./CreatePokemonForm.scss";
import PokeFormCard from "./helpers/PokeFormCard";

function CreatePokemonForm() {
    const dispatch = useDispatch();
    const [input, setInput] = useState(V.inputFormState);
    const [error, setError] = useState(V.errorFormState);
    const pokemon = useSelector((state) => state.pokemon);

    const onSubmit = async (e) => {
        e.preventDefault();
        let obj = await V.checkFunction(input);
        setError((prevState) => {
            return { ...prevState, ...obj };
        });
        if (obj.state) {
            if (obj.nombre) {
                let $inputNombre = document.getElementById("Formnombre");
                if (!$inputNombre.classList.contains("ErrorForm")) {
                    $inputNombre.classList.add("ErrorForm");
                }
            }

            if (obj.categorias) {
                let $categoria1 = document.getElementById("categoria1");
                let $categoria2 = document.getElementById("categoria2");
                if (!$categoria1.classList.contains("ErrorSelector")) {
                    $categoria1.classList.add("ErrorSelector");
                }
                if (!$categoria2.classList.contains("ErrorSelector")) {
                    $categoria2.classList.add("ErrorSelector");
                }
            }

            if (obj.img) {
                let $img = document.getElementById("Formimg");
                if (!$img.classList.contains("ErrorForm")) {
                    $img.classList.add("ErrorForm");
                }
            }
        }

        if (obj.state === false) {
            dispatch(ClearPokemon());
            dispatch(createPokemon(input));
            handleReset();
        }
    };

    const handleReset = (e) => {
        setInput(V.inputFormState);
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
                    [e.target.name]: false,
                });
            }
        }
        if (e.target.name === "nombre") {
            let $inputNombre = document.getElementById("Formnombre");
            if (C.onlyLetters(e.target.value)) {
                if ($inputNombre.classList.contains("ErrorForm")) {
                    $inputNombre.classList.remove("ErrorForm");
                }
                setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                });
            } else {
                if (!$inputNombre.classList.contains("ErrorForm")) {
                    $inputNombre.classList.add("ErrorForm");
                }
            }
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value,
            });
        }
        if (e.target.name === "categoria1" || e.target.name === "categoria2") {
            let $categoria1 = document.getElementById("categoria1");
            let $categoria2 = document.getElementById("categoria2");

            if (e.target.value === input.categoria1 || e.target.value === input.categoria2) {
                if (!$categoria1.classList.contains("ErrorSelector")) {
                    $categoria1.classList.add("ErrorSelector");
                }
                if (!$categoria2.classList.contains("ErrorSelector")) {
                    $categoria2.classList.add("ErrorSelector");
                }
            } else {
                if ($categoria1.classList.contains("ErrorSelector")) {
                    $categoria1.classList.remove("ErrorSelector");
                }
                if ($categoria2.classList.contains("ErrorSelector")) {
                    $categoria2.classList.remove("ErrorSelector");
                }
            }
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

        if (e.target.name === "img") {
            let $img = document.getElementById("Formimg");
            if ($img.classList.contains("ErrorForm")) {
                $img.classList.remove("ErrorForm");
            }
        }
    };

    useEffect(() => {
        dispatch(ClearPokemon());

        return () => {
            dispatch(ClearPokemon());
        };
    }, [dispatch]);

    return (
        <div className="CreateFormContainer" id="banana">
            <div className="PokeFormCardContainer">{pokemon.nombre ? <PokeFormCard props={pokemon} /> : null}</div>
            <div className="FormBackground"></div>
            <form action="" onSubmit={onSubmit} className="CreateForm">
                <InputCreator props={V.inputs.nombre} value={input.nombre} onChange={handleChange} />
                <InputCreator props={V.inputs.vida} value={input.vida} onChange={handleChange} />
                <InputCreator props={V.inputs.fuerza} value={input.fuerza} onChange={handleChange} />
                <InputCreator props={V.inputs.defensa} value={input.defensa} onChange={handleChange} />
                <InputCreator props={V.inputs.velocidad} value={input.velocidad} onChange={handleChange} />
                <InputCreator props={V.inputs.altura} value={input.altura} onChange={handleChange} />
                <InputCreator props={V.inputs.peso} value={input.peso} onChange={handleChange} />
                <OptionsSelector name="categoria1" labelName="Tipo 1" value={input.categoria1} onChange={handleChange} />
                <OptionsSelector name="categoria2" labelName="Tipo 2" value={input.categoria2} onChange={handleChange} />
                <InputCreator props={V.inputs.img} value={input.img} onChange={handleChange} />
                <div className="formButtons">
                    <button type="submit">Crear</button>
                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
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
