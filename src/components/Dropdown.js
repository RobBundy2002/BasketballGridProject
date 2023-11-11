import React from "react";
import { StyledDropdown } from "./styles/StyledDropdown";
import { StyledDropdownBox } from "./styles/StyledDropdownBox"

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