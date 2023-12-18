import React from "react";
import { StyledCategoryBox } from "./styles/StyledCategoryBox";

const CategoryBox = ({ category }) => (
    <StyledCategoryBox>
        <p>{category}</p>
    </StyledCategoryBox>
)

export default CategoryBox;