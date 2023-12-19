const Matrix = require('../models/matrixModel')
const mongoose = require('mongoose')
import schoolNames from '../data/schools'
import categoriesList from '../data/categories'
import jsonData from '../data/player_data.json'

// GET ALL WORKOUTS
const getMatrices = async (req, res) => {
    // const workouts = await Workout.find({}).sort({createdAt: -1})
    // res.status(200).json(workouts)
}

// GET A SINGLE WORKOUT
const getMatrix = async (req, res) => {
    // const { id } = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: 'No such workout'})
    // }
    // const workout = await Workout.findById(id)
    // if(!workout) {
    //     return res.status(400).json({error: 'No such workout'})
    // }
    // res.status(200).json(workout)
}

// CREATE NEW WORKOUT
const createMatrix = async (req, res) => {
    // const {title, load, reps} = req.body
    // try {
    //     const workout = await Workout.create({title, load, reps})
    //     res.status(200).json(workout)
    // } catch (error) {
    //     res.status(400).json({error: error.message})
    // }

    const {month, day, year} = req.body
    let answers = []
    let images = []
    let categories = []

    let invalid = true
    while (invalid) {
        // RESET VALUES
        invalid = false
        let numbers = []
        answers = []
        images = []
        categories = []
        for (let i=0; i<3; i++) {
            answers[i] = []
        }
    
        // SELECT 3 RANDOM SCHOOLS
        const shuffledSchools = schoolNames.sort(() => Math.random() - 0.5)
        const schools = shuffledSchools.slice(0, 3)
    
        // SELECT 3 RANDOM CATEGORIES
        const shuffledAttributes = categoriesList.sort(() => Math.random() - 0.5)
        const attributes = shuffledAttributes.slice(0, 3)

        //CROSS CHECK EACH TEAM WITH ATTRIBUTE
        for(let i=0; i<3; i++){
            let attribute = attributes[i];
            // SEASON AVERAGES
            if (attribute === "+ Points Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'points_per_game', 10, 20, schools, i, 3, 5);
            }
            else if (attribute === "+ Rebounds Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'rebounds_per_game', 5, 10, schools, i, 3);
            }
            else if (attribute === "+ Assists Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'assists_per_game', 4, 10, schools, i, 3);
            }
            else if (attribute === "+ Blocks Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'blocks_per_game', 1, 3, schools, i, 3);
            }
            else if (attribute === "+ Steals Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'steals_per_game', 1, 3, schools, i, 3);
            }
            else if (attribute === "+ Minutes Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'minutes_per_game', 25, 40, schools, i, 3, 5);
            }
            else if (attribute === "+ FG Made Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'fg_per_game', 4, 8, schools, i, 3);
            }
            else if (attribute === "%+ FG Percentage (Season)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answers, 'season_averages', 'fg_percentage', 45, 60, schools, i, 3, 5);
            }
            else if (attribute === "+ 3PT Made Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'three_point_per_game', 2, 5, schools, i, 3);
            }
            else if (attribute === "%+ 3PT Percentage (Season)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answers, 'season_averages', 'three_point_percentage', 35, 45, schools, i, 3, 5);
            }
            else if (attribute === "+ FT Made Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'ft_per_game', 4, 10, schools, i, 3, 2);
            }
            else if (attribute === "%+ FT Percentage (Season)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answers, 'season_averages', 'ft_percentage', 75, 90, schools, i, 3, 5);
            }
            else if (attribute === "+ Turnovers Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'turnovers_per_game', 1, 3, schools, i, 3);
            }
            else if (attribute === "+ Fouls Per Game (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_averages', 'fouls_per_game', 2, 4, schools, i, 3);
            }
            // CAREER AVERAGES
            else if (attribute === "+ Minutes Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'minutes_per_game', 25, 40, schools, i, 3, 5);
            }
            else if (attribute === "+ FG Made Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'fg_per_game', 4, 8, schools, i, 3);
            }
            else if (attribute === "%+ FG Percentage (Career)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answers, 'career_averages', 'fg_percentage', 45, 60, schools, i, 3, 5);
            }
            else if (attribute === "+ 3PT Made Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'three_point_per_game', 2, 5, schools, i, 3);
            }
            else if (attribute === "%+ 3PT Percentage (Career)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answers, 'career_averages', 'three_point_percentage', 35, 45, schools, i, 3, 5);
            }
            else if (attribute === "+ FT Made Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'ft_per_game', 4, 10, schools, i, 3, 2);
            }
            else if (attribute === "%+ FT Percentage (Career)"){
                invalid = invalid || checkValidStatsCategoryPercentage(answers, 'career_averages', 'ft_percentage', 75, 90, schools, i, 3, 5);
            }
            else if (attribute === "+ Turnovers Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'turnovers_per_game', 1, 3, schools, i, 3);
            }
            else if (attribute === "+ Fouls Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'fouls_per_game', 2, 4, schools, i, 3);
            }
            else if (attribute === "+ Points Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'points_per_game', 10, 20, schools, i, 3, 5);
            }
            else if (attribute === "+ Rebounds Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'rebounds_per_game', 5, 10, schools, i, 3);
            }
            else if (attribute === "+ Assists Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'assists_per_game', 4, 10, schools, i, 3);
            }
            else if (attribute === "+ Blocks Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'blocks_per_game', 1, 3, schools, i, 3);
            }
            else if (attribute === "+ Steals Per Game (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_averages', 'steals_per_game', 1, 3, schools, i, 3);
            }
            // SEASON TOTALS
            else if (attribute === "+ Games Played (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'games_played', 30, 40, schools, i, 3, 5);
            }
            else if (attribute === "+ Games Started (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'games_started', 30, 40, schools, i, 3, 5);
            }
            else if (attribute === "+ Minutes Played (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'minutes_played', 800, 1200, schools, i, 3, 100);
            }
            else if (attribute === "+ Field Goals Made (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'field_goals_made', 100, 500, schools, i, 3, 100);
            }
            else if (attribute === "+ 3pt Made (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'three_point_made', 50, 100, schools, i, 3, 10);
            }
            else if (attribute === "+ Free Throws Made (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'free_throws_made', 50, 150, schools, i, 3, 50);
            }
            else if (attribute === "+ Rebounds (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'rebounds', 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Assists (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'assists', 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Steals (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'steals', 40, 100, schools, i, 3, 20);
            }
            else if (attribute === "+ Blocks (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'blocks', 40, 100, schools, i, 3, 20);
            }
            else if (attribute === "+ Turnovers (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'turnovers', 50, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Fouls (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'fouls', 50, 150, schools, i, 3, 25);
            }
            else if (attribute === "+ Points (Season)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'season_totals', 'points', 300, 1000, schools, i, 3, 100);
            }
            // CAREER TOTALS
            else if (attribute === "+ Games Played (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'games_played', 30, 40, schools, i, 3, 5);
            }
            else if (attribute === "+ Games Started (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'games_started', 30, 40, schools, i, 3, 5);
            }
            else if (attribute === "+ Minutes Played (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'minutes_played', 800, 1200, schools, i, 3, 100);
            }
            else if (attribute === "+ Field Goals Made (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'field_goals_made', 100, 500, schools, i, 3, 100);
            }
            else if (attribute === "+ 3pt Made (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'three_point_made', 50, 100, schools, i, 3, 10);
            }
            else if (attribute === "+ Free Throws Made (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'free_throws_made', 50, 150, schools, i, 3, 50);
            }
            else if (attribute === "+ Rebounds (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'rebounds', 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Assists (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'assists', 150, 300, schools, i, 3, 25);
            }
            else if (attribute === "+ Steals (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'steals', 40, 100, schools, i, 3, 20);
            }
            else if (attribute === "+ Blocks (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'blocks', 40, 100, schools, i, 3, 20);
            }
            else if (attribute === "+ Turnovers (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'turnovers', 50, 100, schools, i, 3, 25);
            }
            else if (attribute === "+ Fouls (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'fouls', 50, 150, schools, i, 3, 25);
            }
            else if (attribute === "+ Points (Career)"){
                invalid = invalid || checkValidStatsCategoryInteger(answers, 'career_totals', 'points', 300, 1000, schools, i, 100);
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
                        answers[i][j] = playerOptions;
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
                        answers[i][j] = playerOptions;
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
                        answers[i][j] = playerOptions;
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
                        answers[i][j] = playerOptions;
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
                        answers[i][j] = playerOptions;
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
                        answers[i][j] = playerOptions;
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
                        invalid = true;
                    }
                    else {
                        //ADD CORRECT PLAYERS TO ARRAY
                        answers[i][j] = playerOptions;
                    }
                }
            }
            // AWARDS
            else if (attribute === "National Champion"){
                invalid = invalid || checkValidAwardsCategory(answers, 'national-champion', schools, i, 10);
            }
            else if (attribute === "NCAA Tournament Most Outstanding Player"){
                invalid = invalid || checkValidAwardsCategory(answers, 'ncaa-tournament-mop', schools, i, 1);
            }
            else if (attribute === "NCAA All-Tournament Team"){
                invalid = invalid || checkValidAwardsCategory(answers, 'ncaa-all-tournament', schools, i, 3);
            }
            else if (attribute === "NCAA All-Region Team"){
                invalid = invalid || checkValidAwardsCategory(answers, 'ncaa-all-region', schools, i, 3);
            }
            else if (attribute === "AP Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answers, 'ap-poy', schools, i, 1);
            }
            else if (attribute === "Consensus All American"){
                invalid = invalid || checkValidAwardsCategory(answers, 'consensus-all-american', schools, i, 1);
            }
            else if (attribute === "Wooden Award Winner"){
                invalid = invalid || checkValidAwardsCategory(answers, 'wooden-award', schools, i, 1);
            }
            else if (attribute === "Naismith Award Winner"){
                invalid = invalid || checkValidAwardsCategory(answers, 'naismith-award', schools, i, 1);
            }
            else if (attribute === "Conference Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answers, 'conference-poy', schools, i, 3);
            }
            else if (attribute === "All-Conference Team"){
                invalid = invalid || checkValidAwardsCategory(answers, 'all-conference-team', schools, i, 3);
            }
            else if (attribute === "Conference Defensive Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answers, 'conference-dpoy', schools, i, 3);
            }
            else if (attribute === "All-Conference Defensive Team"){
                invalid = invalid || checkValidAwardsCategory(answers, 'all-conference-defense', schools, i, 3);
            }
            else if (attribute === "Conference Freshman of the Year"){
                invalid = invalid || checkValidAwardsCategory(answers, 'conference-roy', schools, i, 3);
            }
            else if (attribute === "Conference Defensive Player of the Year"){
                invalid = invalid || checkValidAwardsCategory(answers, 'conference-dpoy', schools, i, 3);
            }
            else if (attribute === "All-Conference Tournament Team"){
                invalid = invalid || checkValidAwardsCategory(answers, 'all-conference-tournament', schools, i, 3);
            }
            else if (attribute === "Conference Tournament Most Valuable Player"){
                invalid = invalid || checkValidAwardsCategory(answers, 'conference-dpoy', schools, i, 1);
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
        answers,
    };

    try {
        const matrix = await Matrix.create(matrixData);
        res.status(200).json(matrix);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

function checkValidStatsCategoryInteger(answers, dataField1, dataField2, start, end, schools, i, needed, jump = 1){
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
            answers[i][j] = playerOptions;
        }
    }
    return false;
}

function checkValidStatsCategoryPercentage(answers, dataField1, dataField2, start, end, schools, i, needed, jump = 1){
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
            answers[i][j] = playerOptions;
        }
    }
    return false;
}

function checkValidAwardsCategory(answers, dataField, schools, i, needed){
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
            answers[i][j] = playerOptions;
        }
    }
    return false;
}

// DELETE A WORKOUT
const deleteMatrix = async (req, res) => {
    // const { id } = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: 'No such workout'})
    // }
    // const workout = await Workout.findOneAndDelete({_id: id})
    // if(!workout) {
    //     return res.status(400).json({error: 'No such workout'})
    // }
    // res.status(200).json(workout)
}

// UPDATE A WORKOUT
const updateMatrix = async (req, res) => {
    // const { id } = req.params
    // if(!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: 'No such workout'})
    // }
    // const workout = await Workout.findByIdAndUpdate({_id: id}, {
    //     ...req.body
    // })
    // if(!workout) {
    //     return res.status(400).json({error: 'No such workout'})
    // }
    // res.status(200).json(workout)
}

module.exports = {
    getMatrices,
    getMatrix,
    createMatrix,
    deleteMatrix,
    updateMatrix
}
