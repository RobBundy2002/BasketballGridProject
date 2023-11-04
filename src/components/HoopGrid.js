import React from "react";
import { StyledHoopGrid } from "./styles/StyledHoopGrid";
import RarityBox from "./RarityBox";
import CategoryGrid from "./CategoryGrid";
import InputGrid from "./InputGrid";
import SchoolGrid from "./SchoolGrid";

const HoopGrid = ({ grid }) => (
    <StyledHoopGrid>
        <RarityBox rarity={"Rarity"}></RarityBox>
        <CategoryGrid></CategoryGrid>
        <SchoolGrid></SchoolGrid>
        <InputGrid></InputGrid>
    </StyledHoopGrid>
)

export default HoopGrid;