const Matrix = require('../models/matrixModel')
const mongoose = require('mongoose')
const schoolNames = require('../data/schools')
const categoriesList = require('../data/categories')
const jsonData = require('../data/player_data.json')

// GET ALL MATRICES
const getMatrices = async (req, res) => {
    
}

// GET SINGLE MATRIX
const getMatrix = async (req, res) => {
    const { year, month, day } = req.params
    try {
        const matrix = await Matrix.findOne({
            year: parseInt(year),
            month: parseInt(month),
            day: parseInt(day),
        })

        if (!matrix) {
            return res.status(404).json({ error: 'Matrix not found' })
        }

        res.status(200).json(matrix)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// CREATE NEW MATRIX
const createMatrix = async (req, res) => {     
    const {month, day, year} = req.body
    let answer = []
    let images = []
    let categories = []
    let numbers = []
    let schools = []
    let attributes = []

    let invalid = true
    while (invalid) {
        // RESET VALUES
        invalid = false
        numbers = []
        answer = []
        for (let i=0; i<3; i++) {
            answer[i] = []
        }
    
        // SELECT 3 RANDOM SCHOOLS
        const shuffledSchools = schoolNames.sort(() => Math.random() - 0.5)
        schools = shuffledSchools.slice(0, 3)
        // schools = ["Virginia", "Duke", "UNC"]
    
        // SELECT 3 RANDOM CATEGORIES
        const shuffledAttributes = categoriesList.sort(() => Math.random() - 0.5)
        attributes = shuffledAttributes.slice(0, 3)

        //CROSS CHECK EACH TEAM WITH ATTRIBUTE
        for(let i=0; i<3; i++){
            let attribute = attributes[i];
            // SEASON AVERAGES
            if (attribute === "+ Points Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'points_per_game', numbers, 10, 20, schools, i, 3, 25);
            }
            else if (attribute === "+ Rebounds Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'rebounds_per_game', numbers, 5, 10, schools, i, 25);
            }
            else if (attribute === "+ Assists Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'assists_per_game', numbers, 4, 10, schools, i, 25);
            }
            else if (attribute === "+ Blocks Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'blocks_per_game', numbers, 1, 3, schools, i, 25);
            }
            else if (attribute === "+ Steals Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'steals_per_game', numbers, 1, 3, schools, i, 25);
            }
            else if (attribute === "+ Minutes Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'minutes_per_game', numbers, 25, 40, schools, i, 3, 25);
            }
            else if (attribute === "+ FG Made Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'fg_per_game', numbers, 4, 8, schools, i, 25);
            }
            else if (attribute === "%+ FG Percentage (Season)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answer, 'season_averages', 'fg_percentage', numbers, 45, 60, schools, i, 3, 25);
            }
            else if (attribute === "+ 3PT Made Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'three_point_per_game', numbers, 2, 5, schools, i, 25);
            }
            else if (attribute === "%+ 3PT Percentage (Season)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answer, 'season_averages', 'three_point_percentage', numbers, 35, 45, schools, i, 3, 25);
            }
            else if (attribute === "+ FT Made Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'ft_per_game', numbers, 4, 10, schools, i, 3, 25);
            }
            else if (attribute === "%+ FT Percentage (Season)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answer, 'season_averages', 'ft_percentage', numbers, 75, 90, schools, i, 3, 25);
            }
            else if (attribute === "+ Turnovers Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'turnovers_per_game', numbers, 1, 3, schools, i, 25);
            }
            else if (attribute === "+ Fouls Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_averages', 'fouls_per_game', numbers, 2, 4, schools, i, 25);
            }
            // CAREER AVERAGES
            else if (attribute === "+ Minutes Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'minutes_per_game', numbers, 25, 40, schools, i, 3, 25);
            }
            else if (attribute === "+ FG Made Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'fg_per_game', numbers, 4, 8, schools, i, 25);
            }
            else if (attribute === "%+ FG Percentage (Career)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answer, 'career_averages', 'fg_percentage', numbers, 45, 60, schools, i, 3, 25);
            }
            else if (attribute === "+ 3PT Made Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'three_point_per_game', numbers, 2, 5, schools, i, 25);
            }
            else if (attribute === "%+ 3PT Percentage (Career)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answer, 'career_averages', 'three_point_percentage', 35, 45, schools, i, 3, 25);
            }
            else if (attribute === "+ FT Made Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'ft_per_game', numbers, 4, 10, schools, i, 3, 25);
            }
            else if (attribute === "%+ FT Percentage (Career)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answer, 'career_averages', 'ft_percentage', numbers, 75, 90, schools, i, 3, 25);
            }
            else if (attribute === "+ Turnovers Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'turnovers_per_game', numbers, 1, 3, schools, i, 25);
            }
            else if (attribute === "+ Fouls Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'fouls_per_game', numbers, 2, 4, schools, i, 25);
            }
            else if (attribute === "+ Points Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'points_per_game', numbers, 10, 20, schools, i, 3, 25);
            }
            else if (attribute === "+ Rebounds Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'rebounds_per_game', numbers, 5, 10, schools, i, 25);
            }
            else if (attribute === "+ Assists Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'assists_per_game', numbers, 4, 10, schools, i, 25);
            }
            else if (attribute === "+ Blocks Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'blocks_per_game', numbers, 1, 3, schools, i, 25);
            }
            else if (attribute === "+ Steals Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_averages', 'steals_per_game', numbers, 1, 3, schools, i, 25);
            }
            // SEASON TOTALS
            else if (attribute === "+ Games Played (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'games_played', numbers, 30, 40, schools, i, 3, 25);
            }
            else if (attribute === "+ Games Started (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'games_started', numbers, 30, 40, schools, i, 3, 25);
            }
            else if (attribute === "+ Minutes Played (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'minutes_played', numbers, 800, 1200, schools, i, 3, 100);
            }
            else if (attribute === "+ Field Goals Made (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'field_goals_made', numbers, 100, 500, schools, i, 3, 100);
            }
            else if (attribute === "+ 3pt Made (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'three_point_made', numbers, 50, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Free Throws Made (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'free_throws_made', numbers, 50, 150, schools, i, 3, 50);
            }
            else if (attribute === "+ Rebounds (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'rebounds', numbers, 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Assists (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'assists', numbers, 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Steals (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'steals', numbers, 40, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Blocks (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'blocks', numbers, 40, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Turnovers (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'turnovers', numbers, 50, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Fouls (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'fouls', numbers, 50, 150, schools, i, 3, 25);
            }
            else if (attribute === "+ Points (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'season_totals', 'points', numbers, 300, 1000, schools, i, 3, 100);
            }
            // CAREER TOTALS
            else if (attribute === "+ Games Played (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'games_played', numbers, 30, 40, schools, i, 3, 25);
            }
            else if (attribute === "+ Games Started (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'games_started', numbers, 30, 40, schools, i, 3, 25);
            }
            else if (attribute === "+ Minutes Played (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'minutes_played', numbers, 800, 1200, schools, i, 3, 100);
            }
            else if (attribute === "+ Field Goals Made (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'field_goals_made', numbers, 100, 500, schools, i, 3, 100);
            }
            else if (attribute === "+ 3pt Made (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'three_point_made', numbers, 50, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Free Throws Made (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'free_throws_made', numbers, 50, 150, schools, i, 3, 50);
            }
            else if (attribute === "+ Rebounds (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'rebounds', numbers, 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Assists (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'assists', numbers, 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Steals (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'steals', numbers, 40, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Blocks (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'blocks', numbers, 40, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Turnovers (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'turnovers', numbers, 50, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Fouls (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'fouls', numbers, 50, 150, schools, i, 3, 25);
            }
            else if (attribute === "+ Points (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answer, 'career_totals', 'points', numbers, 300, 1000, schools, i, 100);
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
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
                    if (playerOptions.length < 10) {
                        //INVALID GRID
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answer[i][j] = playerOptions;
                    }
                }
            }
            // AWARDS
            else if (attribute === "National Champion"){
                invalid = invalid || checkValidAwardsCategory(answer, 'national-champion', schools, numbers, i, 10);
            }
            else if (attribute === "NCAA Tournament Most Outstanding Player"){
                invalid = invalid || checkValidAwardsCategory(answer, 'ncaa-tournament-mop', schools, numbers, i, 1);
            }
            else if (attribute === "NCAA All-Tournament Team"){
                invalid = invalid || checkValidAwardsCategory(answer, 'ncaa-all-tournament', schools, numbers, i, 3);
            }
            else if (attribute === "NCAA All-Region Team"){
                invalid = invalid || checkValidAwardsCategory(answer, 'ncaa-all-region', schools, numbers, i, 3);
            }
            else if (attribute === "AP Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answer, 'ap-poy', schools, numbers, i, 1);
            }
            else if (attribute === "Consensus All American"){
                invalid = invalid || checkValidAwardsCategory(answer, 'consensus-all-american', schools, numbers, i, 1);
            }
            else if (attribute === "Wooden Award Winner"){
                invalid = invalid || checkValidAwardsCategory(answer, 'wooden-award', schools, numbers, i, 1);
            }
            else if (attribute === "Naismith Award Winner"){
                invalid = invalid || checkValidAwardsCategory(answer, 'naismith-award', schools, numbers, i, 1);
            }
            else if (attribute === "Conference Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answer, 'conference-poy', schools, numbers, i, 3);
            }
            else if (attribute === "All-Conference Team"){
                invalid = invalid || checkValidAwardsCategory(answer, 'all-conference-team', schools, numbers, i, 3);
            }
            else if (attribute === "Conference Defensive Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answer, 'conference-dpoy', schools, numbers, i, 3);
            }
            else if (attribute === "All-Conference Defensive Team"){
                invalid = invalid || checkValidAwardsCategory(answer, 'all-conference-defense', schools, numbers, i, 3);
            }
            else if (attribute === "Conference Freshman of the Year"){
                invalid = invalid || checkValidAwardsCategory(answer, 'conference-roy', schools, numbers, i, 3);
            }
            else if (attribute === "Conference Defensive Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answer, 'conference-dpoy', schools, numbers, i, 3);
            }
            else if (attribute === "All-Conference Tournament Team"){
                invalid = invalid || checkValidAwardsCategory(answer, 'all-conference-tournament', schools, numbers, i, 3);
            }
            else if (attribute === "Conference Tournament Most Valuable Player"){
                invalid = invalid || checkValidAwardsCategory(answer, 'conference-dpoy', schools, numbers, i, 1);
            }
        }      
    }

    // UPDATE SCHOOL IMAGES
    for (let i=0; i<3; i++){
        const name = schools[i]
        images.push(`/logos/${name}.png`)
    }

    // UPDATE CATEGORIES
    for (let i=0; i<3; i++){
        const category = attributes[i]
        const number = numbers[i]
        if (category === "Jersey Number "){
            categories.push(category + number)
        }
        else if (number === null){
            categories.push(category)
        }
        else {
            categories.push(number + category)
        }
    }  

    const matrixData = {
        images,
        categories,
        day,
        month,
        year,
        answer,
    };

    try {
        const matrix = await Matrix.create(matrixData);
        res.status(200).json(matrix);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

function checkValidStatsCategoryInteger(answer, dataField1, dataField2, numbers, start, end, schools, i, needed, jump = 1){
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
            return true;
        }
        else {
            //ADD CORRECT PLAYERS TO ARRAY
            answer[i][j] = playerOptions;
        }
    }
    return false;
}

function checkValidStatsCategoryPercentage(answer, dataField1, dataField2, numbers, start, end, schools, i, needed, jump = 1){
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
            return true;
        }
        else {
            //ADD CORRECT PLAYERS TO ARRAY
            answer[i][j] = playerOptions;
        }
    }
    return false;
}

function checkValidAwardsCategory(answer, dataField, schools, numbers, i, needed){
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
            return true;
        }
        else {
            //ADD CORRECT PLAYERS TO ARRAY
            answer[i][j] = playerOptions;
        }
    }
    return false;
}

// DELETE A MATRIX
const deleteMatrix = async (req, res) => {
    
}

// UPDATE A MATRIX
const updateMatrix = async (req, res) => {
    
}

module.exports = {
    getMatrices,
    getMatrix,
    createMatrix,
    deleteMatrix,
    updateMatrix
}
