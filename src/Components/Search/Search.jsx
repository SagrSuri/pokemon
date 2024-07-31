import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({ updateSearchTerm }) {
    const [inputValue, setInputValue] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);
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
        setInputValue(e.target.value);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchTriggered(true);
            setIsRequired(true); // Make the input required when Enter is pressed
        }
    };

    // Handle search button click
    const handleSearchClick = () => {
        setSearchTriggered(true);
        setIsRequired(true); // Make the input required when the button is clicked
    };

    // Trigger search if search was triggered
    if (searchTriggered) {
        console.log('Input Value:', inputValue); // Log the input value
        debouncedCallback(inputValue);
        setSearchTriggered(false); // Reset search trigger
    }

    return (
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="Pokemon name or ID...."
                value={inputValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                required={isRequired} // Set required based on the state
            />
            <button className='btnsearch' onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default Search;
