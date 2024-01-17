const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Initialize env variable
dotenv.config();

// Connection to DB
connectDB()

// App instance
const app = express();

// Body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Register routes
app.use('/api/v1/auth', require('./routes/auth.route'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`.white.bold))
