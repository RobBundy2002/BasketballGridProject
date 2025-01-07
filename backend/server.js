require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const matrixRoutes = require('./routes/matrix')
const cron = require('node-cron');
const cors = require('cors');
const { createMatrix } = require('./controllers/matrixController')

// EXPRESS APP
const app = express()

// MIDDLEWARE
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// CORS MIDDLEWARE
app.use(cors({
    // SET THE ORIGIN TO YOUR FRONTEND'S URL
    origin: 'https://matrix-madness-frontend.onrender.com',
}));

// ROUTES
app.use('/api/matrix', matrixRoutes)

// CONNECT TO DATABASE
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // LISTEN FOR REQUESTS
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });