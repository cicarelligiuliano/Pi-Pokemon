export const checkMax = (pokemons, filter) => {
    const { which, type = "all" } = filter;
    let array = [];
    let poke = pokemons.forEach((el) => array.push({ hide: el.hide, types: el.types, created: el.created }));
    poke = array.map((el) => filterBy(el, which, type));
    let count = 0;
    poke.forEach((el) => {
        if (el.hide === false) {
            count++;
        }
    });
    return count / 12 - 1;
};

const filterBy = (el, which, type) => {
    if (which === "all" || which ===    "") {
        if (type === "all" || type === "") {
            el.hide = false;
            return el;
        } else if (el.types[0].id === Number(type) || (el.types[1] && el.types[1].id === Number(type))) {
            el.hide = false;
            return el;
        } else {
            el.hide = true;
            return el;
        }
    } else if (which === "original") {
        if (el.created === false) {
            if (type === "all" || type === "") {
                el.hide = false;
                return el;
            } else if (el.types[0].id === Number(type) || (el.types[1] && el.types[1].id === Number(type))) {
                el.hide = false;
                return el;
            } else {
                el.hide = true;
                return el;
            }
        } else {
            el.hide = true;
            return el;
        }
    } else if (which === "created") {
        if (el.created === true) {
            if (type === "all" || type === "") {
                el.hide = false;
                return el;
            } else if (el.types[0].id === Number(type) || (el.types[1] && el.types[1].id === Number(type))) {
                el.hide = false;
                return el;
            } else {
                el.hide = true;
                return el;
            }
        } else {
            el.hide = true;
            return el;
        }
    }
};
