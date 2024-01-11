const bcrypt = require("bcryptjs");
const db = require("../models/index");
const User = db.user;

//Desc   get login page
//Route  GET /auth/login
//Access public
const getLoginPage = async (req, res) => {
  try {
    const cookie = req.session.isLogged;
    res.render("auth/login", {
      title: "Login",
      isAuthenticated: cookie,
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   login user
//Route  POST /auth/login
//Access public
const loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      if (matchPassword) {
        req.session.isLogged = true;
        req.session.user = userExist;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/diary/my");
        });
      } else {
        return res.redirect("/auth/login");
      }
    } else {
      return res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
};

//Desc   get register page
//Route  GET /auth/register
//Access public
const getRegisterPage = async (req, res) => {
  try {
    res.render("auth/registration", {
      title: "Login",
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   Register new  user
//Route  POST /auth/registration
//Access public
const registerUser = async (req, res) => {
  try {
    const { email, name, password, password2 } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (password !== password2) {
      return res.redirect("/auth/registration");
    }

    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.redirect("/auth/registration");
    }
    await User.create({
      email,
      name,
      password: hashedPassword,
    });
    return res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
  }
};

//Desc   logout user
//Route  GET /auth/logout
//Access private
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
module.exports = {
  getLoginPage,
  loginUser,
  logout,
  getRegisterPage,
  registerUser,
};
