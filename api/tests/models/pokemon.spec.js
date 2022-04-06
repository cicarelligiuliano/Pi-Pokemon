const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

const pokemon = {
    nombre: "giuliano",
    vida: 120,
    fuerza: 90,
    defensa: 50,
    velocidad: 69,
    altura: 180,
    peso: 110,
    categorias: [5, 7],
    created: true,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/180.gif",
};
const pokemon2 = {
    nombre: "giuliano",
    vida: 120,
    fuerza: 90,
    defensa: 50,
    velocidad: 69,
    altura: 180,
    peso: 110,
    categorias: [5, 7],
    created: true,
    img: "dasdasdasdad",
};

describe("Pokemon model", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );
    describe("Validaciones", () => {
        beforeEach(() => Pokemon.sync({ force: true }));
        describe("name", async () => {
            it("Deberia devolver un error si no se le envia nombre", (done) => {
                Pokemon.create({})
                    .then(() => done(new Error("Requiere un nombre valido")))
                    .catch(() => done());
            });
            it("Deberia crear un pokemon si solo se le pasa nombre", async () => {
                let poke = await Pokemon.create({ nombre: "giuliano" });
                expect(poke.dataValues.nombre).equal("giuliano");
            });
        });
        describe("create", () => {
            it("Deberia cargar los valores pasados al crear un pokemon", async () => {
                let poke = await Pokemon.create(pokemon);
                let giuliano = poke.dataValues;
                expect(giuliano.nombre).to.equal(pokemon.nombre);
                expect(giuliano.vida).to.equal(pokemon.vida);
                expect(giuliano.fuerza).to.equal(pokemon.fuerza);
                expect(giuliano.defensa).to.equal(pokemon.defensa);
                expect(giuliano.velocidad).to.equal(pokemon.velocidad);
                expect(giuliano.altura).to.equal(pokemon.altura);
                expect(giuliano.peso).to.equal(pokemon.peso);
                expect(giuliano.img).to.equal(pokemon.img);
                expect(giuliano.created).to.equal(true);
            });
            it("No deberia cargar el pokemon si la img no es valida", async () => {
                let res = await Pokemon.create(pokemon2)
                    .then(() => new Error("La img debe ser una URL"))
                    .catch(() => "");
                expect(res).not.to.be.a("error");
            });
        });
    });
});
