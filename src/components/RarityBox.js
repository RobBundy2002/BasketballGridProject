import React from "react";
import styled, { keyframes } from 'styled-components';

const sparkleAnimation = keyframes`
  0% { color: #ff6b6b; }
  25% { color: #3569cf; }
  50% { color: #ff6b6b; }
  75% { color: #3569cf; }
  100% { color: #ff6b6b; }
`;

const StyledRarityBox = styled.div`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5%;
    transition: .3s;
    height: 150px;
    width: 150px;
    //margin: 5px;
    margin-top: 300px;
    animation: ${sparkleAnimation} 40s infinite;
`
const RarityBox = ({ rarity }) => (
    <StyledRarityBox>
        <p>{rarity}</p>
    </StyledRarityBox>
)

export default RarityBox;