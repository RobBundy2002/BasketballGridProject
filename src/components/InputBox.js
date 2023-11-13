import React from "react";
import { StyledInputBox } from "./styles/StyledInputBox";

const InputBox = ({ row, column, answers, guess, setSearchVisible, clearSearches, hideSearches }) => {

    const clicked = () => {
        clearSearches();
        hideSearches();
        setSearchVisible(true);
        console.log(answers[row]);
    };

    return (
        <StyledInputBox onClick={clicked}>{guess}</StyledInputBox>
    );
};

export default InputBox;