import React from "react";
import styled from 'styled-components';

const StyledSchoolBox = styled.div`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vm;
    font-weight: bold;
    justify-content: center;
    border-radius: 5%;
    transition: .3s;
    width: 95%;
    aspect-ratio: 1 / 1;
    padding: 2.5%;
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