import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterAll } from "../../redux/actions";
import OptionsSelector from "../helpers/OptionsSelector";
import Pagination from "../helpers/Pagination";
import "./FilterBar.scss";
import * as V from "./variables";

const FilterBar = ({ pokemons }) => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        which: "",
        type: "all",
        order: "",
        page: 0,
    });

    const handlePage = (e) => {
        let $buttons = document.querySelectorAll(".pageNumbers");
        if (e.target.name === "next") {
            for (let i = 0; i < $buttons.length; i++) {
                if (!(Number($buttons[i].name) === filter.page + 2) && $buttons[i].classList.contains("activeButton")) {
                    $buttons[i].classList.remove("activeButton");
                } else if (Number($buttons[i].name) === filter.page + 2) {
                    $buttons[i].classList.add("activeButton");
                }
            }
            setFilter({
                ...filter,
                page: filter.page + 1,
            });
        } else if (e.target.name === "previous") {
            for (let i = 0; i < $buttons.length; i++) {
                if (!(Number($buttons[i].name) === filter.page) && $buttons[i].classList.contains("activeButton")) {
                    $buttons[i].classList.remove("activeButton");
                } else if (Number($buttons[i].name) === filter.page) {
                    $buttons[i].classList.add("activeButton");
                }
            }

            if (filter.page !== 0) {
                setFilter({
                    ...filter,
                    page: filter.page - 1,
                });
            }
        } else {
            for (let i = 0; i < $buttons.length; i++) {
                if (!($buttons[i].name === e.target.name) && $buttons[i].classList.contains("activeButton")) {
                    $buttons[i].classList.remove("activeButton");
                } else if ($buttons[i].name === e.target.name) {
                    $buttons[i].classList.add("activeButton");
                }
            }
            setFilter({
                ...filter,
                page: e.target.value - 1,
            });
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

    if (pokemons.length !== 0) {
        var maxPage = V.checkMax(pokemons, filter);
    }

    return (
        <nav>
            <div className="FilterBarContainer">
                <div className="filter">
                    <label htmlFor="Filter" className="label">
                        Filter
                    </label>
                    <br />
                    <select name="order" id="order" value={filter.order} onChange={handleOrder}>
                        <option value="">Name or Attack</option>
                        <option value="byNameAsc">By name ↑</option>
                        <option value="byNameDesc">By name ↓</option>
                        <option value="byStrDesc">By attack ↑</option>
                        <option value="byStrAsc">By attack ↓</option>
                    </select>
                    <br />
                    <OptionsSelector name="categoria1" labelName="" value={filter.type} onChange={handleType} />
                    <select name="which" id="which" value={filter.which} onChange={handleWhich}>
                        <option value="">Origin</option>
                        <option value="all">All</option>
                        <option value="original">Original</option>
                        <option value="created">Created</option>
                    </select>
                </div>

                <div className="pageControl">
                    <Pagination max={maxPage} onClick={handlePage} actual={filter.page} />
                </div>
            </div>
        </nav>
    );
};

export default FilterBar;
