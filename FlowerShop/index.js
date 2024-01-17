const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const hbs = require('express-handlebars');
const db = require('./models');

const app = express();

// Initialize env variables
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// Initialize template engine
app.engine('.hbs', hbs.engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

// Initialize routes
app.use('/', require('./routes/flower.route'))
// app.use('/', (req, res) => {

// })

const run = async () => {
    try {
        const port = process.env.PORT || 3000
        const connect = await db.sequelize.sync({force: true})
        console.log('Connected to PostgreSQL \n db: ', connect);
        app.listen(port, () => console.log('Server running on port: ', port))

    } catch (error) {
        console.log(error);
    }
}

run()