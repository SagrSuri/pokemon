import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

// CSS import
import './Pokedex.css';

function Pokedex() {
    const [searchTerm, setSearchterm] = useState('');

    console.log("Current searchTerm:", searchTerm);

    return (
        <div className="pokedex-wrapper">
            <Search updateSearchTerm={setSearchterm} />
            { (!searchTerm) ? 
                <PokemonList /> : 
                <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
            }
        </div>
    )
}

export default Pokedex;
