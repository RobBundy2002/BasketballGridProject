const mongoose = require('mongoose')

const Schema = mongoose.Schema

const matrixSchema = new Schema({
    images: {
        type: [String],
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    answer: {
        type: [
            [
                {
                    type: Schema.Types.Mixed
                }
            ]
        ],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Matrix', matrixSchema)