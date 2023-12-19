require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const matrixRoutes = require('./routes/matrix')

// EXPRESS APP
const app = express()

// MIDDLEWARE
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// ROUTES
app.use('/api/matrix', matrixRoutes)

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // LISTEN FOR REQUESTS
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })