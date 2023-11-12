import React from "react";
import { useEffect, useState } from 'react';
import { StyledHoopGrid } from "./styles/StyledHoopGrid";
import RarityBox from "./RarityBox";
import CategoryGrid from "./CategoryGrid";
import InputBox from "./InputBox";
import SchoolGrid from "./SchoolGrid";
import { generateGrid, gridAnswers, images, categories } from "./GenerateGrid";
import { StyledContainer } from "./styles/StyledContainer";
import { StyledSearchBar } from "./styles/StyledSearchBar";
import TextBox from "./TextBox";
import { generateSearchTerms } from "./GetPlayers";
import Dropdown from "./Dropdown";
import { StyledInputGrid } from "./styles/StyledInputGrid";

const HoopGrid = () => {

    // ARRAY OF IMAGE LINKS
    const [selectedImages, setSelectedImages] = useState([]);
    
    // ARRAY OF CATEGORIES
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    // 3x3 ARRAY OF ANSWERS TO THE GRID
    const [answers, setAnswers] = useState([]);
    
    // LIST OF PLAYER NAMES
    const searchTerms = generateSearchTerms(14000);

    // TODO: PUT THESE IN DIFFERENT FILES
    const [searchVisible00, setSearchVisible00] = useState(false);
    const [searchTerm00, setSearchTerm00] = useState('');
    const [searchResults00, setSearchResults00] = useState([]);
    const [dropdownVisible00, setDropdownVisible00] = useState(false);
    const [guess00, setGuess00] = useState('');

    const handleDropdownItemClicked = (row, column, result) => {
        console.log(row, column, result);
        if(row === 0 && column === 0){
            const blockAnswer = answers[column][row]
            const matchingAnswer = blockAnswer.find(answer => answer.name === result);
            if (matchingAnswer){
                setGuess00(result);
            }
            setSearchVisible00(false);
        }
    }
    
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
            <StyledHoopGrid>
                <RarityBox rarity={"Rarity"}></RarityBox>
                <CategoryGrid categories={selectedCategories}></CategoryGrid>
                <SchoolGrid schools={selectedImages}></SchoolGrid>
                <StyledInputGrid>
                    <InputBox row={0} column={0} answers={answers[0]} guess={guess00} setSearchVisible={setSearchVisible00} setSearchTerm={setSearchTerm00}></InputBox>
                    <InputBox row={0} column={1} answers={answers[1]}></InputBox>
                    <InputBox row={0} column={2} answers={answers[2]}></InputBox>
                    <InputBox row={1} column={0} answers={answers[0]}></InputBox>
                    <InputBox row={1} column={1} answers={answers[1]}></InputBox>
                    <InputBox row={1} column={2} answers={answers[2]}></InputBox>
                    <InputBox row={2} column={0} answers={answers[0]}></InputBox>
                    <InputBox row={2} column={1} answers={answers[1]}></InputBox>
                    <InputBox row={2} column={2} answers={answers[2]}></InputBox>
                </StyledInputGrid>
            </StyledHoopGrid>
            {searchVisible00 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm00} setValue={setSearchTerm00} searchTerms={searchTerms} setSearchResults={setSearchResults00} setDropdownVisible={setDropdownVisible00}></TextBox>
                    {dropdownVisible00 && searchResults00.length > 0 && (<Dropdown searchResults={searchResults00} handleDropdownItemClicked={handleDropdownItemClicked} row={0} column={0}></Dropdown>)}
                </StyledSearchBar>
            )}
        </StyledContainer>
    );
}

export default HoopGrid;