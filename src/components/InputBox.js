import React from "react";
import { StyledInputBox } from "./styles/StyledInputBox";

const InputBox = ({ row, column, answers, guess, setSearchVisible }) => {

    const clicked = () => {
        setSearchVisible(true);
        console.log(answers[row]);
    };

    return (
        <StyledInputBox onClick={clicked}>{guess}</StyledInputBox>
    );
};

export default InputBox;