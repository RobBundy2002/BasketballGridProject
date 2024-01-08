import React from "react";
import SchoolImage from "./SchoolBox";
import styled from 'styled-components';

const StyledSchoolGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-content: center;
    border-radius: 5%;
    margin-top: -400px;
`

const SchoolGrid = ({ schools }) => (
    <StyledSchoolGrid>
        <SchoolImage image={schools[0]}></SchoolImage>
        <SchoolImage image={schools[1]}></SchoolImage>
        <SchoolImage image={schools[2]}></SchoolImage>
    </StyledSchoolGrid>
)

export default SchoolGrid;