import React from "react";
import styled from 'styled-components';

const StyledInputBox = styled.div`
    background-color: ${props => props.searchVisible ? '#cc0000' : '#ff3333'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vm;
    font-weight: bold;
    color: white;
    justify-content: center;
    border-radius: 5%;
    cursor: pointer;
    transition: .3s;
    width: 95%;
    aspect-ratio: 1 / 1;
    padding: 2.5%;
`

const InputBox = ({ row, column, answers, guess, searchVisible, setSearchVisible, clearSearches, hideSearches }) => {

    const clicked = () => {
        clearSearches();
        hideSearches();
        setSearchVisible(true);
        console.log(answers[row]);
    };

    return (
        <StyledInputBox searchVisible={searchVisible} onClick={clicked}>{guess}</StyledInputBox>
    );
};

export default InputBox;