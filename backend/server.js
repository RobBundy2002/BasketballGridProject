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
        const dailyTask = async () => {
            // Place your code here that you want to run daily
            console.log('Running daily task at', new Date())
            const currentDate = new Date()
            const tomorrowDate = new Date()
            tomorrowDate.setDate(currentDate.getDate()+1)
            const day = tomorrowDate.getDate()
            const month = tomorrowDate.getMonth() + 1
            const year = tomorrowDate.getFullYear()

            const matrixData = {month, day, year}
            const response = await fetch('localhost:4000/api/matrix', {
                method: 'POST',
                body: JSON.stringify(matrixData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            console.log(json)
            if(!response.ok) {
                console.log("Didn't work")
            }
            if (response.ok) {
                console.log('New Matrix Added', json)
            }
            console.log("Finished")
        };

        // Schedule the task to run every day at a specific time (in this example, at 2:00 AM)
        cron.schedule('20 13 * * *', dailyTask);

        // LISTEN FOR REQUESTS
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });