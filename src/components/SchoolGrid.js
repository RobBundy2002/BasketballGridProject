import React from "react";
import { StyledSchoolGrid } from "./styles/StyledSchoolGrid";
import SchoolImage from "./SchoolBox";

const SchoolGrid = ({ schools }) => (
    <StyledSchoolGrid>
        <SchoolImage image={"/logos/ACC.png"}></SchoolImage>
        <SchoolImage image={"/logos/ACC.png"}></SchoolImage>
        <SchoolImage image={"/logos/ACC.png"}></SchoolImage>
    </StyledSchoolGrid>
)

export default SchoolGrid;