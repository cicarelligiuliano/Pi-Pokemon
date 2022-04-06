import React from "react";

function InputCreator(propiedades) {
    const props = propiedades.props;

    if (props.type === "range") {
        return (
            <>
                <div className="Input">
                    <label className="Input-label" htmlFor="">
                        {props.labelName}{" "}
                    </label>
                    <input
                        className="Input-input input-range"
                        type={props.type}
                        min={props.min}
                        max={props.max}
                        name={props.name}
                        id={"Form" + props.name}
                        value={propiedades.value}
                        onChange={propiedades.onChange}
                    />
                    <label className="Input-value" htmlFor="">
                        {propiedades.value}
                        {props.unit}
                    </label>

                    <br />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="Input">
                    <label htmlFor="" className="Input-label ">
                        {props.labelName + " "}
                    </label>
                    <input
                        className="Input-input input-box"
                        type={props.type}
                        name={props.name}
                        id={"Form" + props.name}
                        placeholder={`${props.placeHolder}`}
                        value={propiedades.value}
                        onChange={propiedades.onChange}
                    />
                    {propiedades.error !== "" ? <span> {propiedades.error}</span> : null}
                    <br />
                </div>
            </>
        );
    }
}

export default InputCreator;
