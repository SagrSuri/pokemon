import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_POKEDEX_URL}/${id}`); // Use environment variable
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
      });
    } catch (error) {
      console.error("Error fetching pokemon details: ", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
      <div className="pokemon-name">{pokemon.name}</div>
      <div className="pokemon-name">
        <span>height:</span> {pokemon.height}
      </div>
      <div className="pokemon-name">
        <span>weight:</span> {pokemon.weight}
      </div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
    </div>
  );
}

export default PokemonDetails;
