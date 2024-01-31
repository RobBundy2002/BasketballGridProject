import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Matrices from './Matrices';

const Header = styled.header`
    background-color: white;
    color: white;
    max-width: 1550px;
    width: 100%;
    height: 7vh;

    img {
        width: auto;
        height: 100%;
        margin-right: 10px;
    }
`;

const InnerDiv = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

const Navbar = ({ dates }) => {
    return (
        <Header>
            <InnerDiv>
                <Link to="/">
                    <img alt="Basketball Logo" src={process.env.PUBLIC_URL + '/MatrixMadnessFullLogo.png'} />
                </Link>
                <Matrices dates={dates}></Matrices>
            </InnerDiv>
        </Header>
    );
}

export default Navbar;
