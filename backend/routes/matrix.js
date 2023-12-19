const express = require('express')
const {
    createMatrix,
    getMatrices,
    getMatrix,
    deleteMatrix,
    updateMatrix
} = require('../controllers/matrixController')

const router = express.Router()

// GET ALL WORKOUTS
router.get('/', getMatrices)

// GET A SINGLE WORKOUT
router.get('/:id', getMatrix)

// POST A NEW WORKOUT
router.post('/', createMatrix)

// DELETE A WORKOUT
router.delete('/:id', deleteMatrix)

// UPDATE A WORKOUT
router.patch('/:id', updateMatrix)

module.exports = router