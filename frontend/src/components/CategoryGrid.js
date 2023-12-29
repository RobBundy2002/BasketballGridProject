import React from "react";
import CategoryBox from "./CategoryBox";
import styled from 'styled-components';

const StyledCategoryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    border-radius: 5%;
`

const CategoryGrid = ({ categories }) => (
    <StyledCategoryGrid>
        <CategoryBox category={categories[0]}></CategoryBox>
        <CategoryBox category={categories[1]}></CategoryBox>
        <CategoryBox category={categories[2]}></CategoryBox>
    </StyledCategoryGrid>
)

export default CategoryGrid;