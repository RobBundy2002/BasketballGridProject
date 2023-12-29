import React from "react";
import styled from 'styled-components';

const StyledTextBox = styled.input`
    border: none;
    outline: none;
    width: 100%;
    background-color: transparent;
    color: white;
    font-size: 16px;
    font-style: italic;
  
    &::placeholder {
        color: white;
    }
`

const TextBox = ({ value, setValue, searchTerms, setSearchResults, setDropdownVisible }) => (
    <StyledTextBox 
        type="text" 
        placeholder="Search..."
        value={value}
        onChange={(e) => {
            const searchTerm = e.target.value;
            setValue(searchTerm);
            const results = searchTerms.filter((term) =>
                term.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
            setDropdownVisible(true);
        }}
        onFocus={() => setDropdownVisible(true)}
        onBlur={() => {
            setTimeout(() => setDropdownVisible(false), 200);
        }}
    />
)

export default TextBox;