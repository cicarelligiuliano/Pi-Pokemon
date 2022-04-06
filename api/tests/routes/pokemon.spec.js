/* eslint-disable import/no-extraneous-dependencies */
const { expect, assert } = require("chai");
var should = require("chai").should();
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
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

describe("Pokemon routes", () => {
    before(() =>
        conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        })
    );
    beforeEach(() => Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon)));

    describe("GET /pokemons", () => {
        it("Deberia devolver 200 con una peticion tipo GET", () => agent.get("/pokemons").expect(200));
        it("Deberia devolver 200 con una peticion tipo GET con query con un nombre que existe en la db", () => agent.get("/pokemons?name=pikachu").expect(200));
        it("Deberia devolver el pokemon que se solicitó de la db", async () => {
            let res = await agent.get("/pokemons?name=giuliano");
            let poke = await Pokemon.findOne({
                where: {
                    nombre: "giuliano",
                },
            });
            let giuliano = poke.dataValues;
            expect(res.body.nombre).to.equal("giuliano");
            expect(res.body.id).to.equal(giuliano.id);
            expect(res.body.vida).to.equal(giuliano.vida);
            expect(res.body.fuerza).to.equal(giuliano.fuerza);
            expect(res.body.defensa).to.equal(giuliano.defensa);
            expect(res.body.velocidad).to.equal(giuliano.velocidad);
            expect(res.body.altura).to.equal(giuliano.altura);
            expect(res.body.peso).to.equal(giuliano.peso);
            expect(res.body.img).to.equal(giuliano.img);
            expect(res.body.created).to.equal(true);
        });
        it("Deberia devolver 200 con una peticion tipo GET pasando query con un nombre que no existe en la db  pero si en la pokeapi", () =>
            agent.get("/pokemons?name=raichu").expect(200));
        it("Deberia devolver el pokemon que se solicitó de la pokeapi", async () => {
            let res = await agent.get("/pokemons?name=raichu");
            // console.log(res.body);
            expect(res.body.nombre).to.equal("raichu");
            expect(res.body.id).to.equal(26);
            expect(res.body.vida).to.equal(60);
            expect(res.body.fuerza).to.equal(90);
            expect(res.body.defensa).to.equal(55);
            expect(res.body.velocidad).to.equal(110);
            expect(res.body.altura).to.equal(80);
            expect(res.body.peso).to.equal(30);
            expect(res.body.img).to.equal("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/26.svg");
            expect(res.body.created).to.equal(false);
        });

        it("should get 404 if pokemon no exist", async () => {
            let res = await agent.get("/pokemons?name=dasdasda");
            expect(res.statusCode).to.equal(404);
        });
        it("should get msg 'Pokemon not found' if pokemon no exist", async () => {
            let res = await agent.get("/pokemons?name=dasdasda");
            console.log(res.text);
            expect(res.text).to.equal('{"msg":"Pokemon not found"}');
        });
    });
});
