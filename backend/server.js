require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const matrixRoutes = require('./routes/matrix')
const cron = require('node-cron');
const createMatrix = require('./controllers/matrixController')

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
        // SCHEDULE DAILY TASK
        const dailyTask = () => {
            // Place your code here that you want to run daily
            console.log('Running daily task at', new Date());
        };

        // Schedule the task to run every day at a specific time (in this example, at 2:00 AM)
        cron.schedule('0 2 * * *', dailyTask);

        // LISTEN FOR REQUESTS
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });