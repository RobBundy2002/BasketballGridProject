import React from "react";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { StyledHoopGrid } from "./styles/StyledHoopGrid";
import RarityBox from "./RarityBox";
import CategoryGrid from "./CategoryGrid";
import InputBox from "./InputBox";
import SchoolGrid from "./SchoolGrid";
import { StyledContainer } from "./styles/StyledContainer";
import { StyledSearchBar } from "./styles/StyledSearchBar";
import TextBox from "./TextBox";
import { generateSearchTerms } from "./GetPlayers";
import Dropdown from "./Dropdown";
import { StyledInputGrid } from "./styles/StyledInputGrid";
import { useInitialize00 } from "../states/row0column0";
import { useInitialize10 } from "../states/row1column0";
import { useInitialize20 } from "../states/row2column0";
import { useInitialize01 } from "../states/row0column1";
import { useInitialize11 } from "../states/row1column1";
import { useInitialize21 } from "../states/row2column1";
import { useInitialize02 } from "../states/row0column2";
import { useInitialize12 } from "../states/row1column2";
import { useInitialize22 } from "../states/row2column2";
import { StyledSearchBarContainer } from "./styles/StyledSearchBarContainer";
import { StyledVictoryMessage} from "./styles/StyledVictoryMessage";
import ReactDOM from 'react-dom';

const HoopGrid = () => {
    // ARRAY OF IMAGE LINKS
    const [selectedImages, setSelectedImages] = useState([]);
    
    // ARRAY OF CATEGORIES
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    // 3x3 ARRAY OF ANSWERS TO THE GRID
    const [answers, setAnswers] = useState([]);

    // DICTIONARY WHERE COOKIE DATA IS STORED
    const [userCookies, setUserCookies] = useState({});
    
    // LIST OF PLAYER NAMES
    const searchTerms = generateSearchTerms(15000);

    // USESTATE VARIABLES FOR EACH SEARCH BAR
    const { searchVisible00, setSearchVisible00, searchTerm00, setSearchTerm00, searchResults00, setSearchResults00, dropdownVisible00, setDropdownVisible00, guess00, setGuess00 } = useInitialize00();
    const { searchVisible10, setSearchVisible10, searchTerm10, setSearchTerm10, searchResults10, setSearchResults10, dropdownVisible10, setDropdownVisible10, guess10, setGuess10 } = useInitialize10();
    const { searchVisible20, setSearchVisible20, searchTerm20, setSearchTerm20, searchResults20, setSearchResults20, dropdownVisible20, setDropdownVisible20, guess20, setGuess20 } = useInitialize20();
    const { searchVisible01, setSearchVisible01, searchTerm01, setSearchTerm01, searchResults01, setSearchResults01, dropdownVisible01, setDropdownVisible01, guess01, setGuess01 } = useInitialize01();
    const { searchVisible11, setSearchVisible11, searchTerm11, setSearchTerm11, searchResults11, setSearchResults11, dropdownVisible11, setDropdownVisible11, guess11, setGuess11 } = useInitialize11();
    const { searchVisible21, setSearchVisible21, searchTerm21, setSearchTerm21, searchResults21, setSearchResults21, dropdownVisible21, setDropdownVisible21, guess21, setGuess21 } = useInitialize21();
    const { searchVisible02, setSearchVisible02, searchTerm02, setSearchTerm02, searchResults02, setSearchResults02, dropdownVisible02, setDropdownVisible02, guess02, setGuess02 } = useInitialize02();
    const { searchVisible12, setSearchVisible12, searchTerm12, setSearchTerm12, searchResults12, setSearchResults12, dropdownVisible12, setDropdownVisible12, guess12, setGuess12 } = useInitialize12();
    const { searchVisible22, setSearchVisible22, searchTerm22, setSearchTerm22, searchResults22, setSearchResults22, dropdownVisible22, setDropdownVisible22, guess22, setGuess22 } = useInitialize22();

    // ADDS DATA TO THE COOKIES DICTIONARY WITH A KEY AND THEN SETS THE COOKIE
    const updateUserAndSetCookie = (key, data) => {
        const cookies = userCookies;
        cookies[key] = data;

        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        Cookies.set('guesses', JSON.stringify(userCookies), { expires: midnight });
        console.log(userCookies);
    };

    // SET COOKIE DATA
    const getDataFromCookie = (cookieData) => {
        console.log("Cookies", cookieData);
        if (cookieData.guess00){
            setGuess00(cookieData.guess00);
        }
        if (cookieData.guess01){
            setGuess01(cookieData.guess01);
        }
        if (cookieData.guess02){
            setGuess02(cookieData.guess02);
        }
        if (cookieData.guess10){
            setGuess10(cookieData.guess10);
        }
        if (cookieData.guess11){
            setGuess11(cookieData.guess11);
        }
        if (cookieData.guess12){
            setGuess12(cookieData.guess12);
        }
        if (cookieData.guess20){
            setGuess20(cookieData.guess20);
        }
        if (cookieData.guess21){
            setGuess21(cookieData.guess21);
        }
        if (cookieData.guess22){
            setGuess22(cookieData.guess22);
        }
        if (
            cookieData.guess00 &&
            cookieData.guess01 &&
            cookieData.guess02 &&
            cookieData.guess10 &&
            cookieData.guess11 &&
            cookieData.guess12 &&
            cookieData.guess20 &&
            cookieData.guess21 &&
            cookieData.guess22
        )   {
            const winMessageElement = document.createElement("div");
            winMessageElement.id = "victory-message-container";
            document.body.appendChild(winMessageElement);

            ReactDOM.render(
                <StyledVictoryMessage>Congratulations! You win!</StyledVictoryMessage>,
                document.getElementById("victory-message-container")
            );
        }
    }

    // HIDES ALL SEARCH BARS
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
        setSearchResults00([]);
        setSearchResults10([]);
        setSearchResults20([]);
        setSearchResults01([]);
        setSearchResults11([]);
        setSearchResults21([]);
        setSearchResults02([]);
        setSearchResults12([]);
        setSearchResults22([]);
    }

    // CLEARS ALL SEARCH BARS
    const clearAllSearches = () => {
        setSearchTerm00('');
        setSearchTerm10('');
        setSearchTerm20('');
        setSearchTerm01('');
        setSearchTerm11('');
        setSearchTerm21('');
        setSearchTerm02('');
        setSearchTerm12('');
        setSearchTerm22('');
    }

    // CHECK IF GUESS IS CORRECT AND SET IT
    const handleDropdownItemClicked = (row, column, result) => {
        console.log(row, column, result);
        const blockAnswer = answers[column][row]
            const matchingAnswer = blockAnswer.find(answer => answer.name === result);
            if (matchingAnswer){
                if (column === 0){
                    if (row === 0){
                        setGuess00(result);
                        updateUserAndSetCookie('guess00', result);
                    }
                    else if (row === 1){
                        setGuess10(result);
                        updateUserAndSetCookie('guess10', result);
                    }
                    else if (row === 2){
                        setGuess20(result);
                        updateUserAndSetCookie('guess20', result);
                    }
                }
                else if (column === 1){
                    if (row === 0){
                        setGuess01(result);
                        updateUserAndSetCookie('guess01', result);
                    }
                    else if (row === 1){
                        setGuess11(result);
                        updateUserAndSetCookie('guess11', result);
                    }
                    else if (row === 2){
                        setGuess21(result);
                        updateUserAndSetCookie('guess21', result);
                    }
                }
                else if (column === 2){
                    if (row === 0){
                        setGuess02(result);
                        updateUserAndSetCookie('guess02', result);
                    }
                    else if (row === 1){
                        setGuess12(result);
                        updateUserAndSetCookie('guess12', result);
                    }
                    else if (row === 2){
                        setGuess22(result);
                        updateUserAndSetCookie('guess22', result);
                    }
                }
            }
            // TODO: CHECK TO SEE IF ALL GUESSES ARE FILLED IN
            hideAllSearches();
    }
    
    // FUNCTION THAT RUNS ON PROJECT INITIALIZATION
    useEffect(() => {
        //GENERATING GRID & SETTING UI
        const fetchMatrix = async () => {
            const currentDate = new Date()
            const month = currentDate.getMonth()+1
            const response = `https://matrix-madness.web.app/${currentDate.getFullYear()}/${month}/${currentDate.getDate()}`;
            const json = await response.json()
            if (!response.ok) {
                console.log("Error Fetching Matrix")
            }
            else {
                console.log("Fetched Matrix", json)
                setSelectedCategories(json.categories);
                setAnswers(json.answer);
                const removeSpaces = (array) => {
                    return array.map((str) => str.replace(/\s/g, ''));
                };
                setSelectedImages(removeSpaces(json.images));
            }
        }

        fetchMatrix()

        // CHECKING IF THERE ARE ANY COOKIES AND SETTING THEM
        const storedUserCookies = Cookies.get('guesses');
        if(storedUserCookies){
            setUserCookies(JSON.parse(storedUserCookies));
            getDataFromCookie(JSON.parse(storedUserCookies));
        }
    }, [])

    return (
        <StyledContainer>
            <StyledSearchBarContainer>
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
            </StyledSearchBarContainer>
            <StyledHoopGrid>
                <RarityBox rarity={"Rarity"}></RarityBox>
                <CategoryGrid categories={selectedCategories}></CategoryGrid>
                <SchoolGrid schools={selectedImages}></SchoolGrid>
                <StyledInputGrid>
                    <InputBox row={0} column={0} answers={answers[0]} guess={guess00} setSearchVisible={setSearchVisible00} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={0} column={1} answers={answers[1]} guess={guess01} setSearchVisible={setSearchVisible01} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={0} column={2} answers={answers[2]} guess={guess02} setSearchVisible={setSearchVisible02} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={1} column={0} answers={answers[0]} guess={guess10} setSearchVisible={setSearchVisible10} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={1} column={1} answers={answers[1]} guess={guess11} setSearchVisible={setSearchVisible11} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={1} column={2} answers={answers[2]} guess={guess12} setSearchVisible={setSearchVisible12} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={2} column={0} answers={answers[0]} guess={guess20} setSearchVisible={setSearchVisible20} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={2} column={1} answers={answers[1]} guess={guess21} setSearchVisible={setSearchVisible21} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                    <InputBox row={2} column={2} answers={answers[2]} guess={guess22} setSearchVisible={setSearchVisible22} clearSearches={clearAllSearches} hideSearches={hideAllSearches}></InputBox>
                </StyledInputGrid>
            </StyledHoopGrid>
        </StyledContainer>
    );
}

export default HoopGrid;