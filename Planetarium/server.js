const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const morgan = require("morgan");
const colors = require("colors");
const cors = require('cors')
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");

// Initialize env variable
dotenv.config();

// Connection to DB
connectDB()

// App instance
const app = express();

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Register routes
app.use('/api/v1/auth', require('./routes/auth.route'))
app.use('/api/v1/stars', require('./routes/star.route'))
app.use('/api/v1/planets', require('./routes/planet.route'))

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`.white.bold))
