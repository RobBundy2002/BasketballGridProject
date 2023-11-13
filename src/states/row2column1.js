import { useState } from 'react';

export function useInitialize21() {
    const [searchVisible21, setSearchVisible21] = useState(false);
    const [searchTerm21, setSearchTerm21] = useState('');
    const [searchResults21, setSearchResults21] = useState([]);
    const [dropdownVisible21, setDropdownVisible21] = useState(false);
    const [guess21, setGuess21] = useState('');

    return {
        searchVisible21,
        setSearchVisible21,
        searchTerm21,
        setSearchTerm21,
        searchResults21,
        setSearchResults21,
        dropdownVisible21,
        setDropdownVisible21,
        guess21,
        setGuess21
    };
}