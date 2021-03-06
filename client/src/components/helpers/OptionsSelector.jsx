import React from "react";

function OptionsSelector(props) {
    return (
        <>
            <div className="optionSelector">
                <label className="OptionSelector-label" htmlFor="">
                    {props.labelName + ""}{" "}
                </label>
                <select name={props.name} value={props.value} id={props.name} onChange={props.onChange}>
                    <option value="">Type</option>
                    <option value="1">Normal</option>
                    <option value="2">Figthing</option>
                    <option value="3">Flying</option>
                    <option value="4">Poison</option>
                    <option value="5">Ground</option>
                    <option value="6">Rock</option>
                    <option value="7">Bug</option>
                    <option value="8">Ghost</option>
                    <option value="9">Steel</option>
                    <option value="10">Fire</option>
                    <option value="11">Water</option>
                    <option value="12">Grass</option>
                    <option value="13">Electric</option>
                    <option value="14">Psychic</option>
                    <option value="15">Ice</option>
                    <option value="16">Dragon</option>
                    <option value="17">Dark</option>
                    <option value="18">Fairy</option>
                    <option value="19">Unknown</option>
                    <option value="20">Shadow</option>
                </select>
                {props.error !== "" ? <span> {props.error}</span> : null}
                <br />
            </div>
        </>
    );
}

export default OptionsSelector;
