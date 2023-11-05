import React from "react";
import { StyledInputBox } from "./styles/StyledInputBox";

const InputBox = ({ row, column, answers }) => (
    <StyledInputBox onClick={() => clicked(answers, row)}></StyledInputBox>
)

const clicked = ( answers, row ) => {
    console.log(answers[row]);
}

export default InputBox;