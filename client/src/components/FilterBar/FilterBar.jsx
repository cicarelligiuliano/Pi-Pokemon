import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAll } from "../../redux/actions";
import "./FilterBar.css";
import * as V from "./variables";

const FilterBar = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({
        which: "all",
        type: "all",
        order: "byNameAsc",
        page: 0,
    });
    const pokemons = useSelector((state) => state.pokemons);
    ;

    const handlePage = (e) => {
        if (e.target.name === "next") {
            let max = V.checkMax(pokemons, filter);
            if (filter.page < max) {
                setFilter({
                    ...filter,
                    page: filter.page + 1,
                });
            }
        } else if (e.target.name === "previous") {
            if (filter.page !== 0) {
                setFilter({
                    ...filter,
                    page: filter.page - 1,
                });
            }
        }
    };

    const handleOrder = (e) => {
        setFilter({
            ...filter,
            order: e.target.value,
            page: 0,
        });
    };
    const handleType = (e) => {
        setFilter({
            ...filter,
            type: e.target.value,
            page: 0,
        });
    };
    const handleWhich = (e) => {
        setFilter({
            ...filter,
            which: e.target.value,
            page: 0,
        });
    };

    useEffect(() => {
        dispatch(filterAll(filter));
    }, [dispatch, filter]);

    return (
        <nav>
            <div>
                <h2>Ordenamiento</h2>
                <select name="order" id="order" value={filter.order} onChange={handleOrder}>
                    <option value="byNameAsc">Por orden alfabetico</option>
                    <option value="byNameDesc">Por orden alfabetico opuesto</option>
                    <option value="byStrDesc">Por ataque descendente</option>
                    <option value="byStrAsc">Por ataque ascendente</option>
                </select>
                <br />
                <select type="url" id="categoria1" name="categoria1" placeholder="Url imagen..." value={filter.type} onChange={handleType}>
                    <option value="all">none</option>
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
                <br />
                <form action="">
                    <label htmlFor="all">All</label>
                    <input type="radio" name="which" id="all" value="all" onChange={handleWhich} defaultChecked />
                    <br />
                    <label htmlFor="all">Originals</label>
                    <input type="radio" name="which" id="original" value="original" onChange={handleWhich} />
                    <br />
                    <label htmlFor="all">Created</label>
                    <input type="radio" name="which" id="created" value="created" onChange={handleWhich} />
                </form>
                <button name="previous" onClick={handlePage}>
                    Previous
                </button>
                <button name="next" onClick={handlePage}>
                    Next
                </button>
            </div>
        </nav>
    );
};

export default FilterBar;
