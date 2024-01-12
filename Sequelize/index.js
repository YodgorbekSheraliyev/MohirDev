const express = require("express");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const db = require("./models/index");
const pool = require("./config/db");

//Initial env variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new pgStore({
      pool: pool,
      tableName: "user_session",
    }),
    secret: "my secret value",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize template engine (handlebars)
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Initialize routes
app.use("/diary", require("./routes/diary.route"));
app.use("/auth", require("./routes/auth.route"));
app.use('/user', require('./routes/user.route'))

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    const connect = await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
