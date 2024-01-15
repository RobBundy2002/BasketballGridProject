import React from "react";
import styled, { keyframes } from 'styled-components';

const sparkleAnimation = keyframes`
  0% { color: #ff6b6b; }
  25% { color: #3569cf; }
  50% { color: #ff6b6b; }
  75% { color: #3569cf; }
  100% { color: #ff6b6b; }
`

const StyledCategoryBox = styled.div`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vm;
    font-weight: bold;
    color: white;
    border-radius: 5%;
    transition: .3s;
    width: 95%;
    aspect-ratio: 1 / 1;
    padding: 2.5%;
    animation: ${sparkleAnimation} 40s infinite;
`

const CategoryBox = ({ category }) => (
    <StyledCategoryBox>
        <p>{category}</p>
    </StyledCategoryBox>
)

export default CategoryBox;