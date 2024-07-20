import { Link } from 'react-router-dom'
import './App.css'
// import Pokedex from './Components/Pokedex/Pokedex'`
import CostomeRoutes from './routes/CostomeRoutes'

function App() {
  return (
    <div className='outer-pokedex'>
    <h1 className="pokedex-heading">
      <Link to={'/pokemon/'}>Pokedex</Link>
    </h1>
    <CostomeRoutes/>
    </div>
  )
}

export default App
