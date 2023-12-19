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
    let numbers = []
    let images = []
    let categories = []

    for (let i=0; i<3; i++) {
        answers[i] = []
    }

    

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
