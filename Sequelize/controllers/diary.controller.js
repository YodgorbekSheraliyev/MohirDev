const db = require('../models/index');
const Diary = db.diary;
const Comment = db.comment

//Desc   get all my diaries page
//Route  GET /diary/my
//Access private
const getMyDiary = async (req, res) => {
    try {
        const diaries = await Diary.findAll({raw: true, include: ['comment'], nest: true})
        res.render("diary/my-diary", {
            title: 'My diary',
            diaries
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
    const {imageUrl, text} = req.body;
    await Diary.create({
        imageUrl: imageUrl,
        text: text
    })
    res.redirect('/diary/my')
  } catch (error) {
    console.log(error);
  }
};

//Desc   get diary
//Route  GET /diary/:id
//Access private
const getDiaryById = async (req, res) => {
    try {
        const diary = await Diary.findByPk(req.params.id, {
            raw: true
        })
        res.render("diary/one-diary", {
            title: 'Diary',
            diaries: diary
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
        const diary = await Diary.findByPk(req.params.id, {raw: true})
        res.render("diary/update-diary", {
            title: 'update diary',
            diary
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
       await Diary.update({text: req.body.text}, {where: {id: req.params.id}})
       res.redirect('/diary/my')
    } catch (error) {
        console.log(error);
    }
};

//Desc   delete diary
//Route  POST /diary/delete/:id
//Access private
const deleteDiary = async (req, res) => {
    try {
       await Diary.destroy({where: {id: req.params.id}})
       res.redirect('/diary/my')
    } catch (error) {
        console.log(error);
    }
};

//Desc   add comment
//Route  POST /diary/comment/:id
//Access private
const addCommentToDiary = async (req, res) => {
    try {
       await Comment.create({
        name: 'Username',
        comment: req.body.comment,
        diaryId: req.params.id
       })
       res.redirect('/diary/'+ req.params.id)
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
  getMyDiary,
  addNewDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  deleteDiary,
  addCommentToDiary
};
