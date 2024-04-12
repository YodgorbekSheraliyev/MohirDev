const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
// const pgStore = require("connect-pg-simple")(session);
const pool = require("./config/db");
const db = require("./models");
const moment = require("moment");

const app = express();

// Initialize env variables
dotenv.config();
const hbsEngine = hbs.create({
  helpers: {
    moment: function (date, format) {
      return moment(date).format(format);
    },
  },
  extname: ".hbs",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({secret: "123", resave: false,  saveUninitialized: false}));
app.use(flash());

// Initialize template engine
app.engine(".hbs", hbsEngine.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Initialize routes
app.use("/", require("./routes/flower.route"));
app.use("/admin/auth", require("./routes/admin.route"));
// app.use('/', (req, res) => {

// })

const run = async () => {
  try {
    const port = process.env.PORT || 3000;
    await db.sequelize
      .sync()
      .then(() => console.log("Connected to PostgreSQL"));
    app.listen(port, () => console.log("Server running on port: ", port));
  } catch (error) {
    console.log(error);
  }
};

run();
