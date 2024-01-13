import { useState } from 'react';

export function useInitialize20() {
    const [searchVisible20, setSearchVisible20] = useState(false);
    const [searchTerm20, setSearchTerm20] = useState('');
    const [searchResults20, setSearchResults20] = useState([]);
    const [dropdownVisible20, setDropdownVisible20] = useState(false);
    const [guess20, setGuess20] = useState('');

    return {
        searchVisible20,
        setSearchVisible20,
        searchTerm20,
        setSearchTerm20,
        searchResults20,
        setSearchResults20,
        dropdownVisible20,
        setDropdownVisible20,
        guess20,
        setGuess20
    };
}