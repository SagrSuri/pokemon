// PokemonDetails.jsx

import { Link, useParams } from "react-router-dom";
import './PokemonDetails.css';
import usePokemonDetails from "../../hooks/usePokemonDetails";
import Favicon from '../Favicon/Favicon';
import { Helmet } from "react-helmet";

function PokemonDetails() {
      const { identifier } = useParams(); // Use 'identifier' instead of destructuring id and name
      const [pokemon, loading] = usePokemonDetails(identifier); // Pass the identifier directly

      if (loading) {
            return <div className="loading">Loading...</div>; // Handle loading state
      }

      if (!pokemon) {
            return <div>No Pokémon data available</div>; // Handle no data state
      }

      const uppercaseName = pokemon.name.toUpperCase();
      return (
            <div className="pokemon-details-wrapper">
                  <Favicon pokemonName={pokemon.name} />
                  <Helmet>
                        <title>{uppercaseName} | {`${pokemon.id}`}</title>
                  </Helmet>
                  <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />

                  <div className="pokemon-details-name">
                        <span>{pokemon.name}</span>
                        <Link to={`/pokemon/${pokemon.name}`}><span id="idpokemon">[{pokemon.id}]</span></Link>
                  </div>
                  <div className="pokemon-details-name">Height: {pokemon.height}</div>
                  <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
                  <div className="pokemon-details-types">
                        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
                  </div>

                  {
                        pokemon.types && pokemon.similarPokemons && (
                              <div className="pokemon-types">
                                    <p>
                                          More <span className="type-pokemon">{pokemon.types[0]}</span> type Pokémon
                                    </p>
                                    <ul className="pokemon-type-list">
                                          {pokemon.similarPokemons.map((p) => {
                                                // Assuming p.pokemon.name contains the Pokémon's name
                                                return (
                                                      <li key={p.pokemon.name}>
                                                            {/* Change the Link to only use the name */}
                                                            <Link to={`/pokemon/${p.pokemon.name.toLowerCase()}`}>
                                                                  {p.pokemon.name}
                                                            </Link>
                                                      </li>
                                                );
                                          })}
                                    </ul>
                              </div>
                        )
                  }

            </div>
      );
}

export default PokemonDetails;
