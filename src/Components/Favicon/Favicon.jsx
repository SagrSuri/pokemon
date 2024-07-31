import React, { useEffect } from 'react';
import axios from 'axios';

// Define your API URL here
const urlPokemon = import.meta.env.VITE_POKEMON_URL;

async function fetchPokemonImage(pokemonName) {
    try {
        const url = `${urlPokemon}/${pokemonName.toLowerCase()}`;
        console.log(`Fetching details from URL: ${url}`);
        const response = await axios.get(url);

        // Log the response to check its structure
        console.log('API Response:', response.data);

        // Check if the response data is in the expected format
        if (response.data && response.data.sprites && response.data.sprites.other && response.data.sprites.other.dream_world) {
            return response.data.sprites.other.dream_world.front_default;
        } else {
            console.error('Expected image URL not found in response data:', response.data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        return null;
    }
}

function setFavicon(pokemonImageUrl) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = pokemonImageUrl;
    document.head.appendChild(link);
}

function Favicon({ pokemonName }) {
    useEffect(() => {
        const updateFavicon = async () => {
            const imageUrl = await fetchPokemonImage(pokemonName);
            if (imageUrl) {
                setFavicon(imageUrl);
            } else {
                console.error('No image URL returned to update favicon');
            }
        };

        updateFavicon();
    }, [pokemonName]); // Dependency array ensures update on change

    return null; // This component does not render anything to the DOM
}

export default Favicon;
