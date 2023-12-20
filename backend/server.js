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
        // Schedule the createMatrix function to run every day at 11 PM
        cron.schedule('0 23 * * *', () => {
            console.log("Running Daily ", new Date())
            // Mock request and response for testing
            const today = new Date();
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1)
            console.log("After Dates")
            const mockRequest = { body: { month: tomorrow.getMonth()+1, day: tomorrow.getDate(), year: tomorrow.getFullYear() } };
            console.log("After Request")
            const mockResponse = {
                status: (code) => ({
                    json: (data) => console.log(`Response: ${code}`, data),
                }),
            };
            console.log("After Response")


            // Call the createMatrix function with the mock request and response
            try {
                createMatrix(mockRequest, mockResponse);
                console.log("Finished");
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