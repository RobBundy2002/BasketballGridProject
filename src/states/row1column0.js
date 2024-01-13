import { useState } from 'react';

export function useInitialize10() {
    const [searchVisible10, setSearchVisible10] = useState(false);
    const [searchTerm10, setSearchTerm10] = useState('');
    const [searchResults10, setSearchResults10] = useState([]);
    const [dropdownVisible10, setDropdownVisible10] = useState(false);
    const [guess10, setGuess10] = useState('');

    return {
        searchVisible10,
        setSearchVisible10,
        searchTerm10,
        setSearchTerm10,
        searchResults10,
        setSearchResults10,
        dropdownVisible10,
        setDropdownVisible10,
        guess10,
        setGuess10
    };
}