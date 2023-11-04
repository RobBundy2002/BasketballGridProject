import React from "react";
import { StyledCategoryGrid } from "./styles/StyledCategoryGrid";
import CategoryBox from "./CategoryBox";

const CategoryGrid = ({ categories }) => (
    <StyledCategoryGrid>
        <CategoryBox category={"Text"}></CategoryBox>
        <CategoryBox category={"Text"}></CategoryBox>
        <CategoryBox category={"Text"}></CategoryBox>
    </StyledCategoryGrid>
)

export default CategoryGrid;