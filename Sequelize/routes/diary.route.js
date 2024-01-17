const { Router } = require("express");
const {
  getMyDiary,
  addNewDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  deleteDiary,
  addCommentToDiary,
  getAllDiary,
} = require("../controllers/diary.controller");
const {body} = require('express-validator')
const router = Router();
const { protected } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");

router.get("/:id", protected, getDiaryById);
router.get("/my", protected, getMyDiary);
router.get("/all", protected, getAllDiary);
router.get("/update/:id", protected, updateDiaryPage);

router.post("/add", upload.single('imageUrl') , body('text', 'Please add least 3 characters').isLength({min: 3}), protected, addNewDiary);
router.post("/update/:id", protected, updateDiary);
router.post("/delete/:id", protected, deleteDiary);
router.post("/comment/:id", protected, addCommentToDiary);

module.exports = router;
