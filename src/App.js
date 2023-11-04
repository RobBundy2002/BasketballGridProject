import './App.css';
import { useState, useEffect } from 'react';
import jsonData from './data/player_data.json';
import InputBox from './components/InputBox';

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

  const schoolNames = [
    "Alabama", "Arizona State", "Arizona", "Arkansas", "Auburn", "Baylor", "Boston College", "California", "Clemson",
    "Colorado", "Duke", "Florida State", "Florida", "Georgia Tech", "Georgia", "Illinois", "Indiana", "Iowa State", "Iowa", "Kansas State",
    "Kansas", "Kentucky", "Louisville", "LSU", "Maryland", "Miami (FL)", "Michigan State", "Michigan", "Minnesota", "Mississippi State",
    "Missouri", "NC State", "Nebraska", "Northwestern", "Notre Dame", "Ohio State", "Oklahoma State", "Oklahoma", "Ole Miss",
    "Oregon State", "Oregon", "Penn State", "Pitt", "Purdue", "Rutgers", "South Carolina", "Stanford", "Syracuse", "TCU",
    "Tennessee", "Texas A&M", "Texas Tech", "Texas", "UCLA", "UNC", "USC", "Utah", "Vanderbilt", "Virginia Tech", "Virginia", "Wake Forest", 
    "Washington State", "Washington", "West Virginia", "Wisconsin", "ACC", "Big 12", "Big Ten", "Pac-12", "SEC"
  ]; 

  const categoriesList = [
    "+ Points Per Game (Season)", "+ Rebounds Per Game (Season)", "+ Assists Per Game (Season)",
    "+ Blocks Per Game (Season)", "+ Steals Per Game (Season)", "+ Minutes Per Game (Season)", "+ FG Made Per Game (Season)",
    "%+ FG Percentage (Season)", "+ 3PT Made Per Game (Season)", "%+ 3PT Percentage (Season)", "+ FT Made Per Game (Season)",
    "%+ FT Percentage (Season)", "+ Turnovers Per Game (Season)", "+ Fouls Per Game (Season)", "+ Minutes Per Game (Career)",
    "+ FG Made Per Game (Career)", "%+ FG Percentage (Career)", "+ 3PT Made Per Game (Career)", "%+ 3PT Percentage (Career)",
    "+ FT Made Per Game (Career)", "%+ FT Percentage (Career)", "+ Turnovers Per Game (Career)", "+ Fouls Per Game (Career)",
    "+ Points Per Game (Career)", "+ Rebounds Per Game (Career)", "+ Assists Per Game (Career)", "+ Blocks Per Game (Career)",
    "+ Steals Per Game (Career)", "+ Games Played (Season)", "+ Games Started (Season)", "+ Minutes Played (Season)",
    "+ Field Goals Made (Season)", "+ 3pt Made (Season)", "+ Free Throws Made (Season)", "+ Rebounds (Season)", "+ Assists (Season)",
    "+ Steals (Season)", "+ Blocks (Season)", "+ Turnovers (Season)", "+ Fouls (Season)", "+ Points (Season)", "+ Games Played (Career)",
    "+ Games Started (Career)", "+ Minutes Played (Career)", "+ Field Goals Made (Career)", "+ 3pt Made (Career)", "+ Free Throws Made (Career)",
    "+ Rebounds (Career)", "+ Assists (Career)", "+ Steals (Career)", "+ Blocks (Career)", "+ Turnovers (Career)", "+ Fouls (Career)",
    "+ Points (Career)", "Played in 1980s", "Played in 1990s", "Played in 2000s", "Played in 2010s", "Played in 2020s", "Jersey Number ",
    "Drafted to NBA", "National Champion", "NCAA Tournament Most Outstanding Player", "NCAA All-Tournament Team", "NCAA All-Region Team",
    "AP Player of the Year", "Consensus All American", "Wooden Award Winner", "Naismith Award Winner", "Conference Player of the Year",
    "All-Conference Team", "Conference Defensive Player of the Year", "All-Conference Defensive Team", "Conference Rookie/Freshman of the Year",
    "All-Conference Tournament Team", "Conference Tournament Most Valuable Player"
  ];

  const gridAnswers = [];
  let numbers = [];

  // TODO: MERGE ROB'S CODE TO THIS BRANCH

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
      // SEASON AVERAGES
      if (attribute === "+ Points Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'points_per_game', 10, 20, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Rebounds Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'rebounds_per_game', 5, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Assists Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'assists_per_game', 4, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Blocks Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'blocks_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Steals Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'steals_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Minutes Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'minutes_per_game', 25, 40, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ FG Made Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'fg_per_game', 4, 8, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ FG Percentage (Season)"){
        let valid = checkValidStatsCategoryPercentage(attribute, 'season_averages', 'fg_percentage', 45, 60, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ 3PT Made Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'three_point_per_game', 2, 5, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ 3PT Percentage (Season)"){
        let valid = checkValidStatsCategoryPercentage(attribute, 'season_averages', 'three_point_percentage', 35, 45, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ FT Made Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'ft_per_game', 4, 10, schools, i, 3, 2);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ FT Percentage (Season)"){
        let valid = checkValidStatsCategoryPercentage(attribute, 'season_averages', 'ft_percentage', 75, 90, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Turnovers Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'turnovers_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Fouls Per Game (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_averages', 'fouls_per_game', 2, 4, schools, i, 3);
        if (!valid){ return false; }
      }
      // CAREER AVERAGES
      else if (attribute === "+ Minutes Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'minutes_per_game', 25, 40, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ FG Made Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'fg_per_game', 4, 8, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ FG Percentage (Career)"){
        let valid = checkValidStatsCategoryPercentage(attribute, 'career_averages', 'fg_percentage', 45, 60, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ 3PT Made Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'three_point_per_game', 2, 5, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ 3PT Percentage (Career)"){
        let valid = checkValidStatsCategoryPercentage(attribute, 'career_averages', 'three_point_percentage', 35, 45, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ FT Made Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'ft_per_game', 4, 10, schools, i, 3, 2);
        if (!valid){ return false; }
      }
      else if (attribute === "%+ FT Percentage (Career)"){
        let valid = checkValidStatsCategoryPercentage(attribute, 'career_averages', 'ft_percentage', 75, 90, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Turnovers Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'turnovers_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Fouls Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'fouls_per_game', 2, 4, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Points Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'points_per_game', 10, 20, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Rebounds Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'rebounds_per_game', 5, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Assists Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'assists_per_game', 4, 10, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Blocks Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'blocks_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Steals Per Game (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_averages', 'steals_per_game', 1, 3, schools, i, 3);
        if (!valid){ return false; }
      }
      // SEASON TOTALS
      else if (attribute === "+ Games Played (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'games_played', 30, 40, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Games Started (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'games_started', 30, 40, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Minutes Played (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'minutes_played', 800, 1200, schools, i, 3, 100);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Field Goals Made (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'field_goals_made', 100, 500, schools, i, 3, 100);
        if (!valid){ return false; }
      }
      else if (attribute === "+ 3pt Made (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'three_point_made', 50, 100, schools, i, 3, 10);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Free Throws Made (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'free_throws_made', 50, 150, schools, i, 3, 50);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Rebounds (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'rebounds', 150, 300, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Assists (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'assists', 150, 300, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Steals (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'steals', 40, 100, schools, i, 3, 20);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Blocks (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'blocks', 40, 100, schools, i, 3, 20);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Turnovers (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'turnovers', 50, 100, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Fouls (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'fouls', 50, 150, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Points (Season)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'season_totals', 'points', 300, 1000, schools, i, 3, 100);
        if (!valid){ return false; }
      }
      // CAREER TOTALS
      else if (attribute === "+ Games Played (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'games_played', 30, 40, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Games Started (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'games_started', 30, 40, schools, i, 3, 5);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Minutes Played (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'minutes_played', 800, 1200, schools, i, 3, 100);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Field Goals Made (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'field_goals_made', 100, 500, schools, i, 3, 100);
        if (!valid){ return false; }
      }
      else if (attribute === "+ 3pt Made (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'three_point_made', 50, 100, schools, i, 3, 10);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Free Throws Made (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'free_throws_made', 50, 150, schools, i, 3, 50);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Rebounds (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'rebounds', 150, 300, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Assists (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'assists', 150, 300, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Steals (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'steals', 40, 100, schools, i, 3, 20);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Blocks (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'blocks', 40, 100, schools, i, 3, 20);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Turnovers (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'turnovers', 50, 100, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Fouls (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'fouls', 50, 150, schools, i, 3, 25);
        if (!valid){ return false; }
      }
      else if (attribute === "+ Points (Career)"){
        let valid = checkValidStatsCategoryInteger(attribute, 'career_totals', 'points', 300, 1000, schools, i, 100);
        if (!valid){ return false; }
      }
      // DECADE PLAYED
      else if (attribute === "Played in 1980s"){
        numbers[i] = null;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasYears = player['years-played'];
            return hasSchool && (hasYears.includes("1979-80") || hasYears.includes("1980-81") || hasYears.includes("1981-82") ||
            hasYears.includes("1982-83") || hasYears.includes("1983-84") || hasYears.includes("1984-85") || hasYears.includes("1985-86") ||
            hasYears.includes("1986-87") || hasYears.includes("1987-88") || hasYears.includes("1988-89") || hasYears.includes("1989-90"))
          })
          if (playerOptions.length < 30) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      else if (attribute === "Played in 1990s"){
        numbers[i] = null;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasYears = player['years-played'];
            return hasSchool && (hasYears.includes("1989-90") || hasYears.includes("1990-91") || hasYears.includes("1991-92") ||
            hasYears.includes("1992-93") || hasYears.includes("1993-94") || hasYears.includes("1994-95") || hasYears.includes("1995-96") ||
            hasYears.includes("1996-97") || hasYears.includes("1997-98") || hasYears.includes("1998-99") || hasYears.includes("1999-00"))
          })
          if (playerOptions.length < 30) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      else if (attribute === "Played in 2000s"){
        numbers[i] = null;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasYears = player['years-played'];
            return hasSchool && (hasYears.includes("1999-00") || hasYears.includes("2000-01") || hasYears.includes("2001-02") ||
            hasYears.includes("2002-03") || hasYears.includes("2003-04") || hasYears.includes("2004-05") || hasYears.includes("2005-06") ||
            hasYears.includes("2006-07") || hasYears.includes("2007-08") || hasYears.includes("2008-09") || hasYears.includes("2009-10"))
          })
          if (playerOptions.length < 30) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      else if (attribute === "Played in 2010s"){
        numbers[i] = null;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasYears = player['years-played'];
            return hasSchool && (hasYears.includes("2009-10") || hasYears.includes("2010-11") || hasYears.includes("2011-12") ||
            hasYears.includes("2012-13") || hasYears.includes("2013-14") || hasYears.includes("2014-15") || hasYears.includes("2015-16") ||
            hasYears.includes("2016-17") || hasYears.includes("2017-18") || hasYears.includes("2018-19") || hasYears.includes("2019-20"))
          })
          if (playerOptions.length < 30) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      else if (attribute === "Played in 2020s"){
        numbers[i] = null;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasYears = player['years-played'];
            return hasSchool && (hasYears.includes("2019-20") || hasYears.includes("2020-21") || hasYears.includes("2021-22") ||
            hasYears.includes("2022-23") || hasYears.includes("2023-24") || hasYears.includes("2024-25") || hasYears.includes("2025-26") ||
            hasYears.includes("2026-27") || hasYears.includes("2027-28") || hasYears.includes("2028-29") || hasYears.includes("2029-30"))
          })
          if (playerOptions.length < 30) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      // JERSEY NUMBER
      else if (attribute === "Jersey Number "){
        // GENERATE JERSEY NUMBER 0-35
        const random = Math.floor(Math.random() * (36));
        numbers[i] = random;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasNumbers = player['jersey_numbers'];
            return hasSchool && hasNumbers.includes(random);
          })
          if (playerOptions.length < 3) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      // DRAFTED TO NBA
      else if (attribute === "Drafted to NBA"){
        numbers[i] = null;
        for(let j=0; j<3; j++){
          let school = schools[j]
          //FILTER THROUGH JSON DATA
          const playerOptions = jsonData.filter(player => {
            const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
            const hasDraft = player['drafted'];
            return hasSchool && hasDraft;
          })
          if (playerOptions.length < 5) {
            //INVALID GRID
            return false;
          }
          else {
            //ADD CORRECT PLAYERS TO ARRAY
            gridAnswers[i][j] = playerOptions;
          }
        }
      }
      // AWARDS
      else if (attribute === "National Champion"){
        let valid = checkValidAwardsCategory(attribute, 'national-champion', schools, i, 10);
        if (!valid){ return false; }
      }
      else if (attribute === "NCAA Tournament Most Outstanding Player"){
        let valid = checkValidAwardsCategory(attribute, 'ncaa-tournament-mop', schools, i, 1);
        if (!valid){ return false; }
      }
      else if (attribute === "NCAA All-Tournament Team"){
        let valid = checkValidAwardsCategory(attribute, 'ncaa-all-tournament', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "NCAA All-Region Team"){
        let valid = checkValidAwardsCategory(attribute, 'ncaa-all-region', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "AP Player of the Year"){
        let valid = checkValidAwardsCategory(attribute, 'ap-poy', schools, i, 1);
        if (!valid){ return false; }
      }
      else if (attribute === "Consensus All American"){
        let valid = checkValidAwardsCategory(attribute, 'consensus-all-american', schools, i, 1);
        if (!valid){ return false; }
      }
      else if (attribute === "Wooden Award Winner"){
        let valid = checkValidAwardsCategory(attribute, 'wooden-award', schools, i, 1);
        if (!valid){ return false; }
      }
      else if (attribute === "Naismith Award Winner"){
        let valid = checkValidAwardsCategory(attribute, 'naismith-award', schools, i, 1);
        if (!valid){ return false; }
      }
      else if (attribute === "Conference Player of the Year"){
        let valid = checkValidAwardsCategory(attribute, 'conference-poy', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "All-Conference Team"){
        let valid = checkValidAwardsCategory(attribute, 'all-conference-team', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "Conference Defensive Player of the Year"){
        let valid = checkValidAwardsCategory(attribute, 'conference-dpoy', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "All-Conference Defensive Team"){
        let valid = checkValidAwardsCategory(attribute, 'all-conference-defense', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "Conference Rookie/Freshman of the Year"){
        let valid = checkValidAwardsCategory(attribute, 'conference-roy', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "Conference Defensive Player of the Year"){
        let valid = checkValidAwardsCategory(attribute, 'conference-dpoy', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "All-Conference Tournament Team"){
        let valid = checkValidAwardsCategory(attribute, 'all-conference-tournament', schools, i, 3);
        if (!valid){ return false; }
      }
      else if (attribute === "Conference Tournament Most Valuable Player"){
        let valid = checkValidAwardsCategory(attribute, 'conference-dpoy', schools, i, 1);
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
      if (cat === "Jersey Number "){
        categories.push(cat + num);
      }
      else if (num === null){
        categories.push(cat);
      }
      else {
        categories.push(num + cat);
      }
    }
    setSelectedCategories(categories);

    return true;
  }

  function checkValidStatsCategoryInteger(category, dataField1, dataField2, start, end, schools, i, needed, jump = 1){
    //GENERATE A RANDOM NUMBER BETWEEN START AND END
    const random = Math.floor(Math.random() * ((end - start) / jump + 1)) * jump + start;
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

  function checkValidStatsCategoryPercentage(category, dataField1, dataField2, start, end, schools, i, needed, jump = 1){
    //GENERATE A RANDOM NUMBER BETWEEN START AND END
    const random = Math.floor(Math.random() * ((end - start) / jump + 1)) * jump + start;
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

  function checkValidAwardsCategory(category, dataField, schools, i, needed){
    numbers[i] = null;
    for(let j=0; j<3; j++){
      let school = schools[j]
      //FILTER THROUGH JSON DATA
      const playerOptions = jsonData.filter(player => {
        const hasSchool = player.teams.includes(school) || player.conferences.includes(school);
        const hasAward = player['awards'][dataField];
        return hasSchool && hasAward;
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

  const handleDropdownTermSelect = (selectedTerm) => {
    setSelectedSearchTerm(selectedTerm);
    setIsDropdownTermSelected(true);
  };

  useEffect(() => {
    let grid = generateGrid();
    while (!grid) {
      grid = generateGrid();
    }
    console.log(grid)

    const termMatch = searchTerms.find((term) => term.toLowerCase() === selectedSearchTerm.toLowerCase());
    if (termMatch) {
      setMatchedTermImage('/logos/Brogdon_Malcolm.jpg');
      setIsMatchedTerm(true);
    } else {
      setMatchedTermImage(null);
      setIsMatchedTerm(false);
    }

    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };

  }, [selectedSearchTerm])

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
      <div className='test'>
        <InputBox row={1} column={1}></InputBox>
      </div>      
    </div>
  );
}

export default App;       