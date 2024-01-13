import React from "react";
import styled from 'styled-components';

const StyledSchoolBox = styled.div`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    justify-content: center;
    border-radius: 5%;
    transition: .3s;
    height: 150px;
    width: 150px;
    margin: 5px;
    img {
        max-width: 100%;
        max-height: 100%;
    }
`
const SchoolBox = ({ image }) => (
    <StyledSchoolBox>
        <img src={image} alt={"Loading..."}></img>
    </StyledSchoolBox>
)

export default SchoolBox;