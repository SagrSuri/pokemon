// CustomRoutes.jsx

import { Routes, Route } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetails from "../components/PokemonDetails/PokemonDetails";

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/pokemon/" element={<Pokedex />} />
            <Route path="/pokemon/:id/:name" element={<PokemonDetails />} /> {/* Route to capture both ID and name */}
        </Routes>
    );
}

export default CustomRoutes;
