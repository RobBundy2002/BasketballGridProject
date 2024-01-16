import React from "react";
import styled from 'styled-components';

const StyledDropdown = styled.div`
    overflow-y: auto;
    width: 100%;
`

const StyledDropdownBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    width: 100%;
    cursor: pointer;
    font-family: Georgia, serif;
    font-style: italic;
    color: white;
    background: #ff3333;
    border: 1px solid #cc0000;
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