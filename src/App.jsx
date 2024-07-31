import { Link } from 'react-router-dom';
import './App.css';
import CustomRoutes from './routes/CustomRoutes';
import Favicon from './components/Favicon/Favicon'; // Import the Favicon component

function App() {
  const pokemonName = ''; // Replace this with dynamic value as needed

  return (
    <div className="outer-pokedex">
      <h1 id="pokedex-heading">
        <Link to="/pokemon/">Pokedex</Link>
      </h1>
      <Favicon pokemonName={pokemonName} /> {/* Use the Favicon component */}
      <CustomRoutes />
    </div>
  );
}

export default App;
