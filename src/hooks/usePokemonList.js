import axios from 'axios';
import { useEffect, useState } from 'react';

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: import.meta.env.VITE_POKEDEX_URL, // Use environment variable
    nextUrl: '',
    preUrl: ''
  });

  async function downloadPokemons() {
    setPokemonListState((state) => ({ ...state, isLoading: true }));
    try {
      const response = await axios.get(pokemonListState.pokedexUrl); // Download list of 20 pokemons
      const pokemonResults = response.data.results; // Get the array of pokemons from results
      console.log(response.data);

      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        preUrl: response.data.previous
      }));

      // Iterating over the array of pokemons and using their url to create an array of promises that will download those 20 pokemons
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      // Passing that promise array to axios.all
      const pokemonData = await axios.all(pokemonResultPromise); // Array of 20 pokemon detailed data
      console.log(pokemonData);

      // Now iterate on the data of each pokemon and extract id name and types
      const pokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false
      }));
    } catch (error) {
      console.error("Error fetching pokemon data: ", error);
      setPokemonListState((state) => ({
        ...state,
        isLoading: false
      }));
    }
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return pokemonListState;
}

export default usePokemonList;
