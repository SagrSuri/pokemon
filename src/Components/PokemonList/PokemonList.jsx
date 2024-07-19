import axios from "axios";
import { useEffect, useState } from "react";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PockemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  
  // const [pokedexUrl, setPokedexUrl] = useState(
  //   "https://pokeapi.co/api/v2/pokemon"
  // );

  // const [nextUrl, setNextUrl] = useState("");
  // const [preUrl, setPreUrl] = useState("");

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
    nextUrl: '',
    preUrl: ''
  })

  async function downloadPokemons() {
    // setIsLoading(true);
    setPokemonListState((state)=>({...state, isLoading: true}))
    const response = await axios.get(pokemonListState.pokedexUrl); // this download list of 20 pokemons
    const pokemonResults = response.data.results; // we get the array of pokemons from results
    console.log(response.data);
    setPokemonListState((state)=>({
      ...state,
       nextUrl: response.data.next ,
        preUrl: response.data.previous
    }));
    // setPreUrl(response.data.previous);

    //iterating over the array of pokemons and using there url to create an array of promises that will download those 20 pokemons
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data
    console.log(pokemonData);

    // now iterate on the data of each pokemon and extract id name and types
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
    // console.log(pokeListResult);
    setPokemonListState((state)=>({ 
      ...state , 
      pokemonList: pokeListResult , 
      isLoading: false
    }));
    // setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return (
    <div className="pokemon-list-wrapper">
      {/* <div className="pokemon-list"> Pokemon List</div> */}
      <div className="pokemon-wrapper">
        {(pokemonListState.isLoading)
          ? "Loding...."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
      <button
          disabled={pokemonListState.preUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.preUrl
            setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
          }}>Prev</button>

        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextUrl
            setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
          }}>Next</button>
      </div>
    </div>
  );
}
export default PockemonList;
