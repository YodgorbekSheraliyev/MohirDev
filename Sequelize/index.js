const express = require("express");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const db = require('./models/index')

//Initial env variables
dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Initialize template engine (handlebars)
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Initialize routes
app.use('/diary', require('./routes/diary.route'))

const PORT = process.env.PORT || 4000;

const start = async () => {
    try {
        const connect = await db.sequelize.sync()
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start()

