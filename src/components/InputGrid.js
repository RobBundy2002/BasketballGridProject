import React from "react";
import { StyledInputGrid } from "./styles/StyledInputGrid";
import InputBox from "./InputBox";

const InputGrid = ({ row, column }) => (
    <StyledInputGrid>
        <InputBox row={0} column={0}></InputBox>
        <InputBox row={0} column={1}></InputBox>
        <InputBox row={0} column={2}></InputBox>
        <InputBox row={1} column={0}></InputBox>
        <InputBox row={1} column={1}></InputBox>
        <InputBox row={1} column={2}></InputBox>
        <InputBox row={2} column={0}></InputBox>
        <InputBox row={2} column={1}></InputBox>
        <InputBox row={2} column={2}></InputBox>
    </StyledInputGrid>
)

export default InputGrid;