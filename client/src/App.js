import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import CreatePokemonForm from "./components/CreatePokemonForm/CreatePokemonForm";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import Pokedex from "./components/Pokedex/Pokedex";
import Home from "./components/Home/Home";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Pokedex />
                </Route>
                <Route exact path="/home">
                    <Nav />
                    <Home />
                </Route>
                <Route exact path="/pokemon/create">
                    <Nav />
                    <CreatePokemonForm />
                </Route>
                <Route exact path="/pokemon/:idPokemon">
                    <Nav />
                    <PokemonDetails />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
