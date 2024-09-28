/* eslint-disable react-hooks/exhaustive-deps */
// usePokemonDetails.js

import axios from "axios";
import { useEffect, useState } from "react";

const urlPokemon = import.meta.env.VITE_POKEMON_URL;
const urlPoemonType = import.meta.env.VITE_TYPE_URL;

function usePokemonDetails(id) {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);

    async function downloadPokemon() {
        setLoading(true);
        try {
            const response = await axios.get(`${urlPokemon}/${id}`);
            const pokemonOfSameTypes = await axios.get(`${urlPoemonType}/${response.data.types ? response.data.types[0].type.name : ''}`);
            setPokemon({
                name: response.data.name,
                id: response.data.id,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name),
                similarPokemons: pokemonOfSameTypes.data.pokemon
            });
        } catch (error) {
            console.log('Error fetching Pokémon details:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]); // Fetch data whenever ID changes

    return [pokemon, loading];
}

export default usePokemonDetails;
