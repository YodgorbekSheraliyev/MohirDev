const db = require("../models/index");
const User = db.user;
const Diary = db.diary;

//Desc   get user profile
//Route  GET /user/profile/:id
//Access private
const getUserProfile = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    raw: true,
  });
  const diaries = await Diary.findAll({
    where: { userId: user.id },
    raw: true,
  });
  try {
    res.render("user/profile", {
      title: user.name,
      diariesLength: diaries.length,
      isAuthenticated: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   get my profile
//Route  GET /user/profile/my
//Access private
const getMyProfile = async (req, res) => {
  const user = req.session.user;
  try {
    res.render("user/myprofile", {
      title: user.name,
      isAuthenticated: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   get update  profile page
//Route  GET /user/profile/update
//Access private
const updateProfilePage = async (req, res) => {
  const user = req.session.user;
  try {
    res.render("user/update-profile", {
      title: user.name,
      isAuthenticated: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   Update  profile
//Route  POST /user/profile/update
//Access private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.session.user.id } });
    if (req.body.email === user.email) {
      return res.redirect("/user/profile/update");
    }
    const newDetails = await User.update(
      { name: req.body.name, email: req.body.email },
      {
        where: { id: req.session.user.id },
        returning: true,
        plain: true,
        raw: true,
      }
    );
    req.session = newDetails[1];
    req.session.save((err) => {
      if (err) throw err;
      res.redirect("/user/profile/my");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUserProfile,
  getMyProfile,
  updateProfilePage,
  updateProfile,
};
