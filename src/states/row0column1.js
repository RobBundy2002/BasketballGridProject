import { useState } from 'react';

export function useInitialize01() {
    const [searchVisible01, setSearchVisible01] = useState(false);
    const [searchTerm01, setSearchTerm01] = useState('');
    const [searchResults01, setSearchResults01] = useState([]);
    const [dropdownVisible01, setDropdownVisible01] = useState(false);
    const [guess01, setGuess01] = useState('');

    return {
        searchVisible01,
        setSearchVisible01,
        searchTerm01,
        setSearchTerm01,
        searchResults01,
        setSearchResults01,
        dropdownVisible01,
        setDropdownVisible01,
        guess01,
        setGuess01
    };
}