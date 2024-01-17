const {Op} = require('sequelize')
const db = require("../models/index");
const { validationResult } = require('express-validator');
const Diary = db.diary;
const Comment = db.comment;
const User = db.user

//Desc   get all my diaries page
//Route  GET /diary/my
//Access private
const getMyDiary = async (req, res) => {
  try {
    const diaries = await Diary.findAll({
      where: {userId: req.session.user.id}, 
      raw: true,
      plain: false,
      include: ["user"],
      nest: true,
    });
    res.render("diary/my-diary", {
      title: "My diary",
      diaries: diaries.reverse(),
      isAuthenticated: req.session.isLogged,
      errorMessage: req.flash('error')
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   get all  diaries page
//Route  GET /diary/all
//Access private
const getAllDiary = async (req, res) => {
  try {
    const currentPage = +req.query.page || 1;
    const itemsLimit = 2
    const diaries = await Diary.findAll({
      raw: true,
      plain: false,
      include: ["user"],
      nest: true,
      limit: itemsLimit,
      offset: (currentPage - 1) * itemsLimit
    });
    const totalData = await Diary.count();
    const lastPage = Math.ceil(totalData / itemsLimit)
    res.render("diary/all-diary", {
      title: "All diaries",
      diaries: diaries.reverse(),
      isAuthenticated: req.session.isLogged,
      totalData: totalData,
      nextPage: currentPage + 1,
      previousPage: currentPage - 1,
      hasNext: currentPage * itemsLimit < totalData,
      hasPrev: currentPage - 1,
      lastPage: lastPage,
      currentPageAndPrevPageNotEqualOne: currentPage !== 1 && (currentPage - 1) !== 1,
      lastPageChecking: lastPage !== currentPage && (currentPage + 1) !== currentPage
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   create  diary
//Route  POST /diary/my
//Access private
const addNewDiary = async (req, res) => {
  try {
    const { text } = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const diaries = await Diary.findAll({
        where: {userId: {[Op.ne]: req.session.user.id}},
        raw: true,
        plain: false,
        include: ["user"],
        nest: true,
      });
      return res.status(400).render('/diary/my-diary', {
        title: 'My Diary',
        isAuthenticated: req.session.isLogged, 
        errorMessage: errors.array()[0].msg,
        diaries: diaries.reverse(),
        csrfToken: req.csrfToken()


      })
    }
    const fileUrl = req.file ? "/uploads/" + req.file.filename : ""
    await Diary.create({
      imageUrl: fileUrl,
      text: text,
      userId: req.session.user.id,
    });
    res.redirect("/diary/my");
  } catch (error) {
    console.log(error);
  }
};

//Desc   get diary
//Route  GET /diary/:id
//Access private
const getDiaryById = async (req, res) => {
  try {
    const data = await Diary.findByPk(req.params.id, {
      raw: false,
      plain: true,
      include: ["comment", 'user'],
      nest: true,
    });
    const diary = await data.toJSON();
    console.log(data);
    res.render("diary/one-diary", {
      title: "Diary",
      diary: diary,
      comments: diary.comment.reverse(),
      isAuthenticated: req.session.isLogged,
      errorMessage: req.flash('error')
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   update diary
//Route  GET /diary/update/:id
//Access private
const updateDiaryPage = async (req, res) => {
  try {
    const diary = await Diary.findByPk(req.params.id, { raw: true });
    res.render("diary/update-diary", {
      title: "update diary",
      diary,
    });
  } catch (error) {
    console.log(error);
  }
};

//Desc   update diary
//Route  POST /diary/update/:id
//Access private
const updateDiary = async (req, res) => {
  try {
    await Diary.update(
      { text: req.body.text },
      { where: { id: req.params.id } }
    );
    res.redirect("/diary/my");
  } catch (error) {
    console.log(error);
  }
};

//Desc   delete diary
//Route  POST /diary/delete/:id
//Access private
const deleteDiary = async (req, res) => {
  try {
    await Diary.destroy({ where: { id: req.params.id } });
    res.redirect("/diary/my");
  } catch (error) {
    console.log(error);
  }
};

//Desc   add comment
//Route  POST /diary/comment/:id
//Access private
const addCommentToDiary = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id)
    if(req.body.comment = ''){
        req.flash('error', 'Please add your comment')
        return res.redirect("/diary/" + req.params.id)
    }
    await Comment.create({
      name: user.name,
      comment: req.body.comment,
      diaryId: req.params.id,
      userId: user.id
    });
    res.redirect("/diary/" + req.params.id);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyDiary,
  getAllDiary,
  addNewDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  deleteDiary,
  addCommentToDiary,
};
