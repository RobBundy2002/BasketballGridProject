import React from "react";
import { StyledSchoolGrid } from "./styles/StyledSchoolGrid";
import SchoolImage from "./SchoolBox";

const SchoolGrid = ({ schools }) => (
    <StyledSchoolGrid>
        <SchoolImage image={schools[0]}></SchoolImage>
        <SchoolImage image={schools[1]}></SchoolImage>
        <SchoolImage image={schools[2]}></SchoolImage>
    </StyledSchoolGrid>
)

export default SchoolGrid;