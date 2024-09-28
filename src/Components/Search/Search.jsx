import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({ updateSearchTerm, pokemonList }) {
      const [inputValue, setInputValue] = useState('');
      const [suggestions, setSuggestions] = useState([]);
      const [isRequired, setIsRequired] = useState(false);

      // Debounced function to update search term
      const debouncedCallback = useDebounce((value) => {
            try {
                  updateSearchTerm(value);
            } catch (error) {
                  console.error('Error in updateSearchTerm:', error);
            }
      }, 2000);

      // Handle input change
      const handleChange = (e) => {
            const value = e.target.value;
            setInputValue(value);

            // Filter suggestions based on input value (starting with)
            if (value) {
                  const filteredSuggestions = pokemonList.filter(pokemon =>
                        pokemon.toLowerCase().startsWith(value.toLowerCase()) // Change to startsWith
                  );
                  setSuggestions(filteredSuggestions);
            } else {
                  setSuggestions([]); // Clear suggestions if input is empty
            }
      };

      // Handle suggestion click
      const handleSuggestionClick = (suggestion) => {
            setInputValue(suggestion); // Set input value to the clicked suggestion
            setSuggestions([]); // Clear suggestions
            updateSearchTerm(suggestion); // Update the search term
      };

      // Handle Enter key press
      const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                  setIsRequired(true);
                  debouncedCallback(inputValue);
            }
      };

      // Handle search button click
      const handleSearchClick = () => {
            setIsRequired(true);
            debouncedCallback(inputValue);
      };

      return (
            <div className="search-wrapper">
                  <input
                        id="pokemon-name-search"
                        type="text"
                        placeholder="Pokemon name or ID...."
                        value={inputValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        required={isRequired}
                  />
                  <button className='btnsearch' onClick={handleSearchClick}>Search</button>

                  {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                              {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                          {suggestion}
                                    </li>
                              ))}
                        </ul>
                  )}
            </div>
      );
}

export default Search;
