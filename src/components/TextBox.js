import React from "react";
import { StyledTextBox } from "./styles/StyledTextBox";

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