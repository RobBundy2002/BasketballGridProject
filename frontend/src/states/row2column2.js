import { useState } from 'react';

export function useInitialize22() {
    const [searchVisible22, setSearchVisible22] = useState(false);
    const [searchTerm22, setSearchTerm22] = useState('');
    const [searchResults22, setSearchResults22] = useState([]);
    const [dropdownVisible22, setDropdownVisible22] = useState(false);
    const [guess22, setGuess22] = useState('');

    return {
        searchVisible22,
        setSearchVisible22,
        searchTerm22,
        setSearchTerm22,
        searchResults22,
        setSearchResults22,
        dropdownVisible22,
        setDropdownVisible22,
        guess22,
        setGuess22
    };
}