import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
    background-color: white;
    color: white;
    max-width: 1550px;
    width: 100%;
    height: 7vh;
    div {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    img {
        width: auto;
        height: 100%;
        margin-right: 10px;
    }

    h1 {
        
    }

    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        height: 100%;
        width: auto;
        font-family: Georgia;
        font-weight: bold;
        background-image: linear-gradient(45deg, #3569cf,#ff6b6b);
        background-clip: text; 
        -webkit-background-clip: text; 
        color: transparent;
        font-size: 7vh;
    }
`;

const Navbar = () => {
    return (
        <Header>
            <div>
                <Link to="/">
                    <img alt="Basketball Logo" src={process.env.PUBLIC_URL + '/MatrixMadnessFullLogo.png'} />
                </Link>
            </div>
        </Header>
    );
}

export default Navbar;
