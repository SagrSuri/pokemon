// Favicon.jsx

import React, { useEffect } from 'react';
import axios from 'axios';

// Define your API URL here
const urlPokemon = import.meta.env.VITE_POKEMON_URL;

async function fetchPokemonImage(pokemonName) {
    try {
        const response = await axios.get(`${urlPokemon}/${pokemonName}`);
        return response.data.sprites.other.dream_world.front_default;
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
            }
        };

        updateFavicon();
    }, [pokemonName]); // Dependency array ensures update on change

    return null; // This component does not render anything to the DOM
}

export default Favicon;
