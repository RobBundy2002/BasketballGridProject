import React from "react";
import styled from 'styled-components';

const StyledTextBox = styled.input`
    display: block;
    color: white;
    background-color: #ff3333;
    border-radius: 5%;
    block-size: 5%;
    outline: none;
    text-align: center;
    width: 60%;
    transition: 0.5s;
    min-height: 30px;
    font-family: Georgia, serif;
    font-style: italic;
  
    &::placeholder {
        color: white;
    }

    &:hover {
        width: 80%;
    }
    
    &:focus {
        width: 100%;
    }
`

const TextBox = ({ value, setValue, searchTerms, setSearchResults, setDropdownVisible }) => (
    <StyledTextBox 
        type="text" 
        placeholder="Search Player Database..."
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