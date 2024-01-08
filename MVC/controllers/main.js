const User = require("../models/users");
//Route     /
//Method    GET
//Description Get main page
const getMainPage = (req, res) => {
  res.render("main", {
    title: "User list",
    users: User.findAll(),
  });
};

//Route     /:uid
//Method    GET
//Description Get user page by uid
const getUserPageByUid = (req, res) => {
    const user = User.findByUid(req.params.uid);
    res.render("user-page", {
      title: user.username,
      user,
    });
  };

module.exports = {
  getMainPage,
  getUserPageByUid
};
