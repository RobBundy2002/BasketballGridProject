import React from "react";
import { StyledCategoryGrid } from "./styles/StyledCategoryGrid";
import CategoryBox from "./CategoryBox";

const CategoryGrid = ({ categories }) => (
    <StyledCategoryGrid>
        <CategoryBox category={categories[0]}></CategoryBox>
        <CategoryBox category={categories[1]}></CategoryBox>
        <CategoryBox category={categories[2]}></CategoryBox>
    </StyledCategoryGrid>
)

export default CategoryGrid;