import React from "react";
import { StyledSchoolBox } from "./styles/StyledSchoolBox";

const SchoolBox = ({ image }) => (
    <StyledSchoolBox>
        <img src={image} alt={"Loading..."}></img>
    </StyledSchoolBox>
)

export default SchoolBox;