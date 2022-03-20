import "./App.css";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import SearchBar from "./components/SearchBar/SearchBar";
import CreatePokemonForm from "./components/CreatePokemonForm/CreatePokemonForm";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import Pokedex from "./components/Pokedex/Pokedex";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <Pokedex />
                </Route>
                <Route exact path="/home">
                    <Nav />
                    <SearchBar />
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
