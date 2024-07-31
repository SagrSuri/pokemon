// PokemonDetails.jsx

import { Link, useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetails from "../../hooks/usePokemonDetails";
import Favicon from '../Favicon/Favicon'; // Adjust the path as needed
import { Helmet } from "react-helmet";

function PokemonDetails() {
    const { id, name } = useParams();
    const [pokemon, loading] = usePokemonDetails(id);

    if (loading) {
        return <div className="loading">Loading...</div>; // Handle loading state
    }

    if (!pokemon) {
        return <div>No Pokémon data available</div>; // Handle no data state
    }

    const uppercaseName = pokemon.name.toUpperCase();
    return (
        <div className="pokemon-details-wrapper">
            <Favicon pokemonName={pokemon.name} /> {/* Update favicon here */}
            <Helmet>
                <title>{uppercaseName} | {`${pokemon.id}`}</title>
            </Helmet>
            <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />

            <div className="pokemon-details-name">
                <span>{pokemon.name}</span>
                <Link to={`/pokemon/${pokemon.id}/${pokemon.name}`}><span id="idpokemon">[{pokemon.id}]</span></Link>
                
            </div>
            <div className="pokemon-details-name">Height: {pokemon.height}</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>

            {
                pokemon.types && pokemon.similarPokemons &&
                <div className="pokemon-types">
                    <p className="">more <span className="type-pokemon">{pokemon.types[0]}</span> type pokemons</p>
                    <ul className="pokemon-type-list">
                        {pokemon.similarPokemons.map((p) => (
                            <li key={p.pokemon.url}>
                                <Link to={`/pokemon/${p.pokemon.url.split('/').slice(-2, -1)[0]}/${p.pokemon.name}`}>{p.pokemon.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}

export default PokemonDetails;
