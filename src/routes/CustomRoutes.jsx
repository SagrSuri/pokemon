import { Routes, Route } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

function CustomRoutes() {
      return (
            <Routes>
                  <Route path="/pokemon/" element={<Pokedex />} />

                  <Route path="/pokemon/:identifier" element={<PokemonDetails />} /> {/* Route to capture both ID and name */}
            </Routes>
      );
}

export default CustomRoutes;
