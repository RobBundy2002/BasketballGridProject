import React, { useState } from 'react';
import styled from 'styled-components';

const Matrices = ({ dates }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const Button = styled.button`
    background-color: #3569cf;
    color: #fff;
    border: none;
    cursor: pointer;
    height: 75%;
    border-radius: 10%;
  `;

  const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 3.5rem;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 10px;
    z-index: 1;
    max-height: 50%;
    overflow-y: auto;

    a {
      color: #333;
      text-decoration: none;
      padding: 5px;
    }

    a:hover {
      background-color: #ddd;
    }
  `;

  const Entire = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
  `;

  return (
    <Entire>
      <Button onClick={toggleDropdown}>
        More Days ▼
      </Button>
      {isDropdownOpen && (
        <Dropdown>
          {dates.map((date) => (
            <a href={`/${date.year}/${date.month}/${date.day}`}>{date.month}-{date.day}-{date.year}</a>
          ))}
        </Dropdown>
      )}
    </Entire>
  );
};

export default Matrices;
