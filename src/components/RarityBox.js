import React from "react";
import { StyledRarityBox } from "./styles/StyledRarityBox";

const RarityBox = ({ rarity }) => (
    <StyledRarityBox>
        <p>{rarity}</p>
    </StyledRarityBox>
)

export default RarityBox;