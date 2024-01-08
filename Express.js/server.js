const express = require("express");
const app = express();
const path = require("path");

// const {engine} = require('express-handlebars')

//PUG
// app.set('view engine', 'pug');
// app.set('views', 'views')

//HANDLEBARS
// app.engine('.hbs', engine({extname:'.hbs'}))
// app.set('view engine', '.hbs')
// app.set('views', 'views')

// EJS
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

const userRoutes = require("./routes/users");
const mainRoutes = require("./routes/main");
app.use("/user", userRoutes.router);
app.use(mainRoutes);
app.use((req, res, next) => {
  res.status(404).render('404', {title: 'Page not found'})
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port: " + port));
