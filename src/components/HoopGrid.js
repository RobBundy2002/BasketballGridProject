import React from "react";
import { useEffect, useState } from 'react';
import { StyledHoopGrid } from "./styles/StyledHoopGrid";
import RarityBox from "./RarityBox";
import CategoryGrid from "./CategoryGrid";
import InputGrid from "./InputGrid";
import SchoolGrid from "./SchoolGrid";
import { generateGrid, gridAnswers, images, categories } from "./GenerateGrid";
import { StyledContainer } from "./styles/StyledContainer";
import { StyledSearchBar } from "./styles/StyledSearchBar";
import TextBox from "./TextBox";
import { generateSearchTerms } from "./GetPlayers";

const HoopGrid = () => {

    const searchTerms = generateSearchTerms(14000);

    // ARRAY OF IMAGE LINKS
    const [selectedImages, setSelectedImages] = useState([]);

    // ARRAY OF CATEGORIES
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    // 3x3 ARRAY OF ANSWERS TO THE GRID
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        let grid = generateGrid();
        while (!grid) {
            grid = generateGrid();
        }
        setSelectedImages(images);
        setSelectedCategories(categories);
        setAnswers(gridAnswers);
        console.log(images);
        console.log(categories)
        console.log(gridAnswers);
        console.log(grid);
    }, [])

    return (
        <StyledContainer>
            <StyledSearchBar>
                <TextBox></TextBox>
            </StyledSearchBar>
            <StyledHoopGrid>
                <RarityBox rarity={"Rarity"}></RarityBox>
                <CategoryGrid categories={selectedCategories}></CategoryGrid>
                <SchoolGrid schools={selectedImages}></SchoolGrid>
                <InputGrid answers={answers}></InputGrid>
            </StyledHoopGrid>
        </StyledContainer>
    );
}

export default HoopGrid;