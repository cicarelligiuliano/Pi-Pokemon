import React from "react";

function InputCreator(propiedades) {
    const props = propiedades.props;

    if (props.type === "range") {
        return (
            <>
                <label htmlFor="">{props.labelName} </label>
                <input
                    type={props.type}
                    min={props.min}
                    max={props.max}
                    name={props.name}
                    value={propiedades.value}
                    onChange={propiedades.onChange}
                />
                <label htmlFor="">{propiedades.value}</label>
                {propiedades.error !== "" ? <span> {propiedades.error}</span> : null}
                <br />
            </>
        );
    } else {
        return (
            <>
                <label htmlFor="">{props.labelName + " "}</label>
                <input type={props.type} name={props.name} placeholder={`${props.placeHolder}`} value={propiedades.value} onChange={propiedades.onChange} />
                {propiedades.error !== "" ? <span> {propiedades.error}</span> : null}
                <br />
            </>
        );
    }
}

export default InputCreator;
