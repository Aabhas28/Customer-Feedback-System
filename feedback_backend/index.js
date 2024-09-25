const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const userRoute = require('./routes/userRoutes')
const feedbackRoute = require('./routes/feedbackRoutes');

const app = express();

app.use(express.json());

// CORS configuration to allow cross-origin requests
app.use(cors({
    origin: true,
    credentials: true
}))


app.get('/', (req, res) => {
    res.send("Server is running..")
})

// Setting up routes for user and feedback functionalities

app.use('/user', userRoute); // All user-related routes will be prefixed with /user
app.use('/feedback', feedbackRoute); // All feedback-related routes will be prefixed with /feedback


mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

    // Starting the server on port 3000
app.listen(3000, () => {
    console.log("server is running.. 3000")
})