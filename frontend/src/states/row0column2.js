import { useState } from 'react';

export function useInitialize02() {
    const [searchVisible02, setSearchVisible02] = useState(false);
    const [searchTerm02, setSearchTerm02] = useState('');
    const [searchResults02, setSearchResults02] = useState([]);
    const [dropdownVisible02, setDropdownVisible02] = useState(false);
    const [guess02, setGuess02] = useState('');

    return {
        searchVisible02,
        setSearchVisible02,
        searchTerm02,
        setSearchTerm02,
        searchResults02,
        setSearchResults02,
        dropdownVisible02,
        setDropdownVisible02,
        guess02,
        setGuess02
    };
}