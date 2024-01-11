import { useState } from 'react';

export function useInitialize00() {
    const [searchVisible00, setSearchVisible00] = useState(false);
    const [searchTerm00, setSearchTerm00] = useState('');
    const [searchResults00, setSearchResults00] = useState([]);
    const [dropdownVisible00, setDropdownVisible00] = useState(false);
    const [guess00, setGuess00] = useState('');

    return {
        searchVisible00,
        setSearchVisible00,
        searchTerm00,
        setSearchTerm00,
        searchResults00,
        setSearchResults00,
        dropdownVisible00,
        setDropdownVisible00,
        guess00,
        setGuess00
    };
}