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

    const [searchVisible10, setSearchVisible10] = useState(false);
    const [searchTerm10, setSearchTerm10] = useState('');
    const [searchResults10, setSearchResults10] = useState([]);
    const [dropdownVisible10, setDropdownVisible10] = useState(false);
    const [guess10, setGuess10] = useState('');

    const [searchVisible20, setSearchVisible20] = useState(false);
    const [searchTerm20, setSearchTerm20] = useState('');
    const [searchResults20, setSearchResults20] = useState([]);
    const [dropdownVisible20, setDropdownVisible20] = useState(false);
    const [guess20, setGuess20] = useState('');

    const [searchVisible01, setSearchVisible01] = useState(false);
    const [searchTerm01, setSearchTerm01] = useState('');
    const [searchResults01, setSearchResults01] = useState([]);
    const [dropdownVisible01, setDropdownVisible01] = useState(false);
    const [guess01, setGuess01] = useState('');

    const [searchVisible11, setSearchVisible11] = useState(false);
    const [searchTerm11, setSearchTerm11] = useState('');
    const [searchResults11, setSearchResults11] = useState([]);
    const [dropdownVisible11, setDropdownVisible11] = useState(false);
    const [guess11, setGuess11] = useState('');

    const [searchVisible21, setSearchVisible21] = useState(false);
    const [searchTerm21, setSearchTerm21] = useState('');
    const [searchResults21, setSearchResults21] = useState([]);
    const [dropdownVisible21, setDropdownVisible21] = useState(false);
    const [guess21, setGuess21] = useState('');

    const [searchVisible02, setSearchVisible02] = useState(false);
    const [searchTerm02, setSearchTerm02] = useState('');
    const [searchResults02, setSearchResults02] = useState([]);
    const [dropdownVisible02, setDropdownVisible02] = useState(false);
    const [guess02, setGuess02] = useState('');

    const [searchVisible12, setSearchVisible12] = useState(false);
    const [searchTerm12, setSearchTerm12] = useState('');
    const [searchResults12, setSearchResults12] = useState([]);
    const [dropdownVisible12, setDropdownVisible12] = useState(false);
    const [guess12, setGuess12] = useState('');

    const [searchVisible22, setSearchVisible22] = useState(false);
    const [searchTerm22, setSearchTerm22] = useState('');
    const [searchResults22, setSearchResults22] = useState([]);
    const [dropdownVisible22, setDropdownVisible22] = useState(false);
    const [guess22, setGuess22] = useState('');

    const hideAllSearches = () => {
        setSearchVisible00(false);
        setSearchVisible10(false);
        setSearchVisible20(false);
        setSearchVisible01(false);
        setSearchVisible11(false);
        setSearchVisible21(false);
        setSearchVisible02(false);
        setSearchVisible12(false);
        setSearchVisible22(false);
    }

    // TODO: CREATE HANDLE OUTSIDE CLICK FUNCTION

    const handleDropdownItemClicked = (row, column, result) => {
        console.log(row, column, result);
        const blockAnswer = answers[column][row]
            const matchingAnswer = blockAnswer.find(answer => answer.name === result);
            if (matchingAnswer){
                if (column === 0){
                    if (row === 0){
                        setGuess00(result);
                    }
                    else if (row === 1){
                        setGuess10(result);
                    }
                    else if (row === 2){
                        setGuess20(result);
                    }
                }
                else if (column === 1){
                    if (row === 0){
                        setGuess01(result);
                    }
                    else if (row === 1){
                        setGuess11(result);
                    }
                    else if (row === 2){
                        setGuess21(result);
                    }
                }
                else if (column === 2){
                    if (row === 0){
                        setGuess02(result);
                    }
                    else if (row === 1){
                        setGuess12(result);
                    }
                    else if (row === 2){
                        setGuess22(result);
                    }
                }
            }
            // TODO: CHECK TO SEE IF ALL GUESSES ARE FILLED IN
            hideAllSearches();
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
                    <InputBox row={0} column={1} answers={answers[1]} guess={guess01} setSearchVisible={setSearchVisible01} setSearchTerm={setSearchTerm01}></InputBox>
                    <InputBox row={0} column={2} answers={answers[2]} guess={guess02} setSearchVisible={setSearchVisible02} setSearchTerm={setSearchTerm02}></InputBox>
                    <InputBox row={1} column={0} answers={answers[0]} guess={guess10} setSearchVisible={setSearchVisible10} setSearchTerm={setSearchTerm10}></InputBox>
                    <InputBox row={1} column={1} answers={answers[1]} guess={guess11} setSearchVisible={setSearchVisible11} setSearchTerm={setSearchTerm11}></InputBox>
                    <InputBox row={1} column={2} answers={answers[2]} guess={guess12} setSearchVisible={setSearchVisible12} setSearchTerm={setSearchTerm12}></InputBox>
                    <InputBox row={2} column={0} answers={answers[0]} guess={guess20} setSearchVisible={setSearchVisible20} setSearchTerm={setSearchTerm20}></InputBox>
                    <InputBox row={2} column={1} answers={answers[1]} guess={guess21} setSearchVisible={setSearchVisible21} setSearchTerm={setSearchTerm21}></InputBox>
                    <InputBox row={2} column={2} answers={answers[2]} guess={guess22} setSearchVisible={setSearchVisible22} setSearchTerm={setSearchTerm22}></InputBox>
                </StyledInputGrid>
            </StyledHoopGrid>
            {searchVisible00 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm00} setValue={setSearchTerm00} searchTerms={searchTerms} setSearchResults={setSearchResults00} setDropdownVisible={setDropdownVisible00}></TextBox>
                    {dropdownVisible00 && searchResults00.length > 0 && (<Dropdown searchResults={searchResults00} handleDropdownItemClicked={handleDropdownItemClicked} row={0} column={0}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible10 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm10} setValue={setSearchTerm10} searchTerms={searchTerms} setSearchResults={setSearchResults10} setDropdownVisible={setDropdownVisible10}></TextBox>
                    {dropdownVisible10 && searchResults10.length > 0 && (<Dropdown searchResults={searchResults10} handleDropdownItemClicked={handleDropdownItemClicked} row={1} column={0}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible20 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm20} setValue={setSearchTerm20} searchTerms={searchTerms} setSearchResults={setSearchResults20} setDropdownVisible={setDropdownVisible20}></TextBox>
                    {dropdownVisible20 && searchResults20.length > 0 && (<Dropdown searchResults={searchResults20} handleDropdownItemClicked={handleDropdownItemClicked} row={2} column={0}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible01 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm01} setValue={setSearchTerm01} searchTerms={searchTerms} setSearchResults={setSearchResults01} setDropdownVisible={setDropdownVisible01}></TextBox>
                    {dropdownVisible01 && searchResults01.length > 0 && (<Dropdown searchResults={searchResults01} handleDropdownItemClicked={handleDropdownItemClicked} row={0} column={1}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible11 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm11} setValue={setSearchTerm11} searchTerms={searchTerms} setSearchResults={setSearchResults11} setDropdownVisible={setDropdownVisible11}></TextBox>
                    {dropdownVisible11 && searchResults11.length > 0 && (<Dropdown searchResults={searchResults11} handleDropdownItemClicked={handleDropdownItemClicked} row={1} column={1}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible21 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm21} setValue={setSearchTerm21} searchTerms={searchTerms} setSearchResults={setSearchResults21} setDropdownVisible={setDropdownVisible21}></TextBox>
                    {dropdownVisible21 && searchResults21.length > 0 && (<Dropdown searchResults={searchResults21} handleDropdownItemClicked={handleDropdownItemClicked} row={2} column={1}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible02 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm02} setValue={setSearchTerm02} searchTerms={searchTerms} setSearchResults={setSearchResults02} setDropdownVisible={setDropdownVisible02}></TextBox>
                    {dropdownVisible02 && searchResults02.length > 0 && (<Dropdown searchResults={searchResults02} handleDropdownItemClicked={handleDropdownItemClicked} row={0} column={2}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible12 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm12} setValue={setSearchTerm12} searchTerms={searchTerms} setSearchResults={setSearchResults12} setDropdownVisible={setDropdownVisible12}></TextBox>
                    {dropdownVisible12 && searchResults12.length > 0 && (<Dropdown searchResults={searchResults12} handleDropdownItemClicked={handleDropdownItemClicked} row={1} column={2}></Dropdown>)}
                </StyledSearchBar>
            )}
            {searchVisible22 && (
                <StyledSearchBar>
                    <TextBox value={searchTerm22} setValue={setSearchTerm22} searchTerms={searchTerms} setSearchResults={setSearchResults22} setDropdownVisible={setDropdownVisible22}></TextBox>
                    {dropdownVisible22 && searchResults22.length > 0 && (<Dropdown searchResults={searchResults22} handleDropdownItemClicked={handleDropdownItemClicked} row={2} column={2}></Dropdown>)}
                </StyledSearchBar>
            )}
        </StyledContainer>
    );
}

export default HoopGrid;