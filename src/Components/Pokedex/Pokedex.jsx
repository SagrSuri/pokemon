import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import './Pokedex.css';

// Assume this is a comprehensive list of Pokémon names
const pokemonList = [
      "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon",
      "charizard", "squirtle", "wartortle", "blastoise", "caterpie",
      // Add all other Pokémon names...
];

function Pokedex() {
      const [searchTerm, setSearchTerm] = useState('');
      const navigate = useNavigate();

      console.log("Current searchTerm:", searchTerm);

      const handleSearch = (term) => {
            if (term) {
                  navigate(`/pokemon/${term.toLowerCase()}`);
            }
      };

      return (
            <div className="pokedex-wrapper">
                  <Search updateSearchTerm={(term) => {
                        setSearchTerm(term);
                        handleSearch(term);
                  }} pokemonList={pokemonList} /> {/* Pass the complete pokemonList here */}
                  {!searchTerm ?
                        <PokemonList /> :
                        null
                  }
            </div>
      );
}

export default Pokedex;
