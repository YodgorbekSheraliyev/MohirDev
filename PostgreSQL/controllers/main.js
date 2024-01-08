const pool = require("../config/db");
const User = require("../models/users");

//Route     /
//Method    GET
//Description Get main page
const getMainPage = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("main", {
      title: "User list",
      users
    });
  } catch (error) {
    console.log(error);
  }
};

//Route     /:id
//Method    GET
//Description Get user page by uid
const getUserPageByUid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("user-page", {
      title: user.username,
      user
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMainPage,
  getUserPageByUid,
};
