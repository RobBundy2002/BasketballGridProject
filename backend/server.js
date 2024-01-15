require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const matrixRoutes = require('./routes/matrix')
const cron = require('node-cron');
const {
    createMatrix,
} = require('./controllers/matrixController')

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
        // SCHEDULED FUNCTION AT 11PM
        cron.schedule('0 23 * * *', () => {
            console.log("Running Daily ", new Date())
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1)
            const mockRequest = { body: { month: tomorrow.getMonth()+1, day: tomorrow.getDate(), year: tomorrow.getFullYear() } };
            const mockResponse = {
                status: (code) => ({
                    json: (data) => console.log(`Response: ${code}`, data),
                }),
            };
            try {
                createMatrix(mockRequest, mockResponse);
            } catch (error) {
                console.error("Error in createMatrix:", error);
            }
        });

        // LISTEN FOR REQUESTS
        app.listen(process.env.PORT, () => {
            console.log('Connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });