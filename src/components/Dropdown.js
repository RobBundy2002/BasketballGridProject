import React from "react";
import styled from 'styled-components';

const StyledDropdown = styled.div`
    left: 0;
    right: 0;
    max-height: 212px;
    overflow-y: auto;
`

const StyledDropdownBox = styled.div`
    padding: 8px;
    cursor: pointer;
    font-family: Georgia, serif;
    font-style: italic;
    color: white;
    border-radius: 5px;
    background: #ff3333;
    border: 1px solid white;
`

const Dropdown = ({ searchResults, handleDropdownItemClicked, row, column}) => (
    <StyledDropdown>
        {searchResults.map((result, index) => (
            <StyledDropdownBox key={index} onClick={() => handleDropdownItemClicked(row, column, result)}>
                {result}
            </StyledDropdownBox>
        ))}
    </StyledDropdown>
)
export default Dropdown;