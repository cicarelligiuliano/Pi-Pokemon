const filterBy = (el, which, type) => {
    if (which === "all" || which === "") {
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

const filterByName = (el, name) => {
    if (el.nombre === name) {
        el.hide = false;
        return el;
    } else {
        el.hide = true;
        return el;
    }
};

const SortArrayByNameAsc = (x, y) => {
    if (x.nombre < y.nombre) {
        return -1;
    }
    if (x.nombre > y.nombre) {
        return 1;
    }
    return 0;
};
const SortArrayByNameDesc = (x, y) => {
    if (x.nombre > y.nombre) {
        return -1;
    }
    if (x.nombre < y.nombre) {
        return 1;
    }
    return 0;
};
const SortArrayByStrAsc = (x, y) => {
    if (x.fuerza < y.fuerza) {
        return -1;
    }
    if (x.fuerza > y.fuerza) {
        return 1;
    }
    return 0;
};

const SortArrayByStrDesc = (x, y) => {
    if (x.fuerza > y.fuerza) {
        return -1;
    }
    if (x.fuerza < y.fuerza) {
        return 1;
    }
    return 0;
};

const orderBy = (pokemons, order) => {
    if (order === "byNameDesc") {
        return pokemons.sort(SortArrayByNameDesc);
    } else if (order === "byNameAsc" || order === "") {
        return pokemons.sort(SortArrayByNameAsc);
    } else if (order === "byStrDesc") {
        return pokemons.sort(SortArrayByStrDesc);
    } else if (order === "byStrAsc") {
        return pokemons.sort(SortArrayByStrAsc);
    }
};

const pageFilter = (pokemons, page) => {
    let first = page * 12;
    let last = first + 12;
    let count = 0;
    let poke = pokemons.map((el) => {
        if (!el.hide) {
            if (count < first || count >= last) {
                el.hide = true;
                count++;
                return el;
            } else {
                el.hide = false;
                count++;
                return el;
            }
        } else return el;
    });
    count = 0;

    return poke;
};

module.exports = {
    filterBy,
    orderBy,
    pageFilter,
    filterByName,
};
