import { Link } from 'react-router-dom';
import './Pokemon.css';

function Pokemon({ name, image }) { // Removed id from props
      return (
            <div className='pokemon'>
                  <Link to={`/pokemon/${name.toLowerCase()}`}> {/* Updated to link by name */}
                        <div className='pokemon-name'>{name}</div>
                        <div>
                              <img className='pokemon-image' src={image} alt={name} /> {/* Added alt text for better accessibility */}
                        </div>
                  </Link>
            </div>
      );
}

export default Pokemon;
