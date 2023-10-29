import './App.css';
import { useState, useEffect } from 'react';
import jsonData from './data/player_data.json';

function App() {
  //ARRAY OF IMAGE LINKS
  const [selectedImages, setSelectedImages] = useState([]);

  //ARRAY OF CATEGORIES
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [clickedBoxIndex, setClickedBoxIndex] = useState(null);
  const [selectedSearchTerm, setSelectedSearchTerm] = useState('');
  const [isMatchedTerm, setIsMatchedTerm] = useState(false); // Define the state variable
  const [matchedTermImage, setMatchedTermImage] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownTermSelected, setIsDropdownTermSelected] = useState(false);
  const searchTerms = ["Malcolm Brogdon"];

  const schoolNames = ["Alabama", "Arizona State", "Arizona", "Arkansas", "Auburn", "Baylor", "Boston College", "California", "Clemson",
    "Colorado", "Duke", "Florida State", "Florida", "Georgia Tech", "Georgia", "Illinois", "Indiana", "Iowa State", "Iowa", "Kansas State",
    "Kansas", "Kentucky", "Louisville", "LSU", "Maryland", "Miami (FL)", "Michigan State", "Michigan", "Minnesota", "Mississippi State",
    "Missouri", "NC State", "Nebraska", "Northwestern", "Notre Dame", "Ohio State", "Oklahoma State", "Oklahoma", "Ole Miss",
    "Oregon State", "Oregon", "Penn State", "Pitt", "Purdue", "Rutgers", "South Carolina", "Stanford", "Syracuse", "TCU",
    "Tennessee", "Texas A&M", "Texas Tech", "Texas", "UCLA", "UNC", "USC", "Utah", "Vanderbilt", "Virginia Tech", "Virginia", "Wake Forest", 
    "Washington State", "Washington", "West Virginia", "Wisconsin", "ACC", "Big 12", "Big Ten", "Pac-12", "SEC"]; 

  const categoriesList = ["+ Points Per Game (Season)", "+ Rebounds Per Game (Season)", "+ Assists Per Game (Season)",
    "+ Blocks Per Game (Season)", "+ Steals Per Game (Season)", "+ Minutes Per Game (Season)", "+ FG Made Per Game (Season)",
    "%+ FG Percentage (Season)", "+ 3PT Made Per Game (Season)", "%+ 3PT Percentage (Season)", "+ FT Made Per Game (Season)",
    "%+ FT Percentage (Season)", "+ Turnovers Per Game (Season)", "+ Fouls Per Game (Season)"];

  const gridAnswers = [];
  let numbers = [];

  // TODO: CONSOLIDATE GRID FUNCTION
  // TODO: ADD REST OF CATEGORIES TO GENERATE GRID FUNCTION
  // TODO: MAKE ONE USEEFFECT METHOD
  // TODO: MERGE ROB'S CODE TO THIS BRANCH

  useEffect(() => {
    let grid = generateGrid();
    while (!grid) {
      grid = generateGrid();
    }
    console.log(grid)
  }, [])

  const generateGrid = () => {
    //GENERATING A VALID GRID
    for (let i=0; i<3; i++) {
      gridAnswers[i] = [];
    }

    //GET 3 RANDOM TEAMS
    const shuffledSchools = schoolNames.sort(() => Math.random() - 0.5);
    const schools = shuffledSchools.slice(0, 3);
    console.log(schools);

    //GET 3 RANDOM ATTRIBUTES
    const shuffledAttributes = categoriesList.sort(() => Math.random() - 0.5);
    const attributes = shuffledAttributes.slice(0, 3);
    console.log(attributes);
    numbers = [null, null, null];

    //CROSS CHECK EACH TEAM WITH ATTRIBUTE
    for(let i=0; i<3; i++){
      let attribute = attributes[i];
      if (attribute === "+ Points Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'points_per_game', 10, 20, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Rebounds Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'rebounds_per_game', 5, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Assists Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'assists_per_game', 4, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Blocks Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'blocks_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Steals Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'steals_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Minutes Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'minutes_per_game', 25, 40, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ FG Made Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'fg_per_game', 4, 8, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ FG Percentage (Season)"){
        let valid = checkValidCategoryPercentage(attribute, 'season_averages', 'fg_percentage', 45, 60, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ 3PT Made Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'three_point_per_game', 2, 5, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ 3PT Percentage (Season)"){
        let valid = checkValidCategoryPercentage(attribute, 'season_averages', 'three_point_percentage', 35, 45, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ FT Made Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'ft_per_game', 4, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ FT Percentage (Season)"){
        let valid = checkValidCategoryPercentage(attribute, 'season_averages', 'ft_percentage', 75, 90, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Turnovers Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'turnovers_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Fouls Per Game (Season)"){
        let valid = checkValidCategoryInteger(attribute, 'season_averages', 'fouls_per_game', 2, 4, schools, i, 3);
        if (!valid){ return false; }
      }
    }
    console.log(numbers);
    console.log(gridAnswers);

    //UPDATE SCHOOL IMAGES
    const images = [];
    for (let i=0; i<3; i++) {
      const name = schools[i];
      images.push(`/logos/${name}.png`);
    }
    setSelectedImages(images);

    //UPDATE CATEGORIES
    const categories = [];
    for (let i=0; i<3; i++){
      const cat = attributes[i];
      const num = numbers[i];
      if (num === null){
        categories.push(cat);
      }
      else {
        categories.push(num + cat);
      }
    }
    setSelectedCategories(categories);

    return true;
  }

  function checkValidCategoryInteger(category, dataField1, dataField2, start, end, schools, i, needed){
    //GENERATE A RANDOM NUMBER BETWEEN START AND END
    const random = Math.floor(Math.random() * (end - start + 1)) + start;
    numbers[i] = random;
    for(let j=0; j<3; j++){
      let school = schools[j]
      //FILTER THROUGH JSON DATA
      const playerOptions = jsonData.filter(player => {
        const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
        const hasCategory = player[dataField1][dataField2];
        return hasSchool && hasCategory >= random
      })
      if (playerOptions.length < needed) {
        //INVALID GRID
        return false;
      }
      else {
        //ADD CORRECT PLAYERS TO ARRAY
        gridAnswers[i][j] = playerOptions;
      }
    }
    return true;
  }

  function checkValidCategoryPercentage(category, dataField1, dataField2, start, end, schools, i, needed){
    //GENERATE A RANDOM NUMBER BETWEEN START AND END
    const random = Math.floor(Math.random() * (end - start + 1)) + start;
    numbers[i] = random;
    for(let j=0; j<3; j++){
      let school = schools[j]
      //FILTER THROUGH JSON DATA
      const playerOptions = jsonData.filter(player => {
        const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
        const hasCategory = player[dataField1][dataField2];
        return hasSchool && hasCategory*100 >= random
      })
      if (playerOptions.length < needed) {
        //INVALID GRID
        return false;
      }
      else {
        //ADD CORRECT PLAYERS TO ARRAY
        gridAnswers[i][j] = playerOptions;
      }
    }
    return true;
  }
    
  const handleBoxClick = (index) => {
    if (![0, 1, 2, 3, 4, 8, 12].includes(index)) {
      setClickedBoxIndex(index);
      setSelectedSearchTerm('');
      setIsSearchBarVisible(true);
    }
  };
  
  const handleBoxMouseEnter = (index) => {
    if (index !== clickedBoxIndex && ![0, 1, 2, 3, 4, 8, 12].includes(index)) {
      setClickedBoxIndex(null);
    }
  };
  
  const handleBoxMouseLeave = () => {
    if (clickedBoxIndex !== null && ![0, 1, 2, 3, 4, 8, 12].includes(clickedBoxIndex)) {
      setClickedBoxIndex(null);
    }
  };
  
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.grid-box') && !e.target.closest('.search-bar')) {
      setIsSearchBarVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const termMatch = searchTerms.find((term) => term.toLowerCase() === selectedSearchTerm.toLowerCase());
  
    if (termMatch) {
      setMatchedTermImage('/logos/Brogdon_Malcolm.jpg');
      setIsMatchedTerm(true);
    } else {
      setMatchedTermImage(null);
      setIsMatchedTerm(false);
    }
  }, [selectedSearchTerm]); 

  const handleDropdownTermSelect = (selectedTerm) => {
    setSelectedSearchTerm(selectedTerm);
    setIsDropdownTermSelected(true);
  };

  return (
    <div className="App">
      <div className="grid">
        <div className="top-bar">
          {/* Content for the top bar */}
          <div className="top-text">
            Patrick, Grant, and Rob - The Side Project
          </div>
        </div>
        <div className={`grid-container`}>
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={index}
              className={`grid-box
                ${index === 0 ? 'image-boxes' : ''}
                ${index === 1 || index === 2 || index === 3 ? 'image-boxes' : ''}
                ${index === 4 || index === 8 || index === 12 ? 'image-boxes' : ''}
                ${index === 5 || index === 6 || index === 7 || index === 9 || index === 10 || index === 11 || index === 13 || index === 14 || index === 15 ? 'your-element' : ''}
                ${clickedBoxIndex === index ? 'clicked-box' : ''}`
              } 
              onClick={() => handleBoxClick(index)}
              onMouseEnter={() => handleBoxMouseEnter(index)}
              onMouseLeave={handleBoxMouseLeave}
            >
            {index === 1 ? (
              <p style={{background: 'linear-gradient(45deg, #ff6b6b, #3569cf)', WebkitBackgroundClip: 'text', color: 'transparent'}}>
                {selectedCategories[0]} 
              </p>
            ) 
            : index === 2 ? (
              <p style={{background: 'linear-gradient(45deg, #ff6b6b, #3569cf)', WebkitBackgroundClip: 'text', color: 'transparent'}}>
                {selectedCategories[1]} 
              </p>
            )
            : index === 3 ? (
              <p style={{background: 'linear-gradient(45deg, #ff6b6b, #3569cf)', WebkitBackgroundClip: 'text', color: 'transparent'}}>
                {selectedCategories[2]} 
              </p>
            )
            : index === 4 ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={selectedImages[0]} className="team-image"/>
            ) 
            : index === 8 ? (
              <img src={selectedImages[1]} alt={`Box ${index + 1}`} className="team-image"/>
            ) 
            : index === 12 ? (
              <img src={selectedImages[2]} alt={`Box ${index + 1}`} className="team-image"/>
            )
            : index === 5 && matchedTermImage ? (
              <img src={matchedTermImage} className="guess-image" alt={`Box ${index + 1}`}/>
            ) : null
            }
            </div>
          ))}
        </div>
      </div>
      <div className="box-container">
        {searchTerms.map((term, index) => (
          <button key={index} className="box-button">
            {term}
          </button>
        ))}
      </div>
      <div className="search-bar-container">
        {isSearchBarVisible && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={selectedSearchTerm}
              onChange={(e) => {
                const searchTerm = e.target.value;
                setSelectedSearchTerm(searchTerm);
                const results = searchTerms.filter((term) =>
                  term.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSearchResults(results);
              }}
              onFocus={() => setIsDropdownVisible(true)}
              onBlur={() => setIsDropdownVisible(false)}
            />
            {/* Dropdown for search suggestions */}
            {isDropdownVisible && searchResults.length > 0 && (
              <div className="dropdown">
                {searchResults.map((result, index) => (
                  <div key={index} className="dropdown-item" onClick={() => setSelectedSearchTerm(result)}>
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;       