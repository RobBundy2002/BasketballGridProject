import { useState } from 'react';

export function useInitialize12() {
    const [searchVisible12, setSearchVisible12] = useState(false);
    const [searchTerm12, setSearchTerm12] = useState('');
    const [searchResults12, setSearchResults12] = useState([]);
    const [dropdownVisible12, setDropdownVisible12] = useState(false);
    const [guess12, setGuess12] = useState('');

    return {
        searchVisible12,
        setSearchVisible12,
        searchTerm12,
        setSearchTerm12,
        searchResults12,
        setSearchResults12,
        dropdownVisible12,
        setDropdownVisible12,
        guess12,
        setGuess12
    };
}