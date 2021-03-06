export const typeColor = {
    bug: "#26de81",
    dragon: "#aaaaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#999999",
    dark: "#111111",
    unknown: "#222222",
};

export const onlyLetters = (value) => {
    return /([a-z*A-Z])/.test(value[value.length - 1]) || value === "";
};
