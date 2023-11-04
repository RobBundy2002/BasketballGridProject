import React from "react";
import { StyledInputBox } from "./styles/StyledInputBox";

const InputBox = ({ row, column }) => (
    <StyledInputBox onClick={() => clicked(row, column)}></StyledInputBox>
)

const clicked = (row, column) => {
    console.log(row, column);
}

export default InputBox;