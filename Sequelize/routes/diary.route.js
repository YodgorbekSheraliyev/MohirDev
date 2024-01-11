const { Router } = require("express");
const {
  getMyDiary,
  addNewDiary,
  getDiaryById,
  updateDiaryPage,
  updateDiary,
  deleteDiary,
  addCommentToDiary,
} = require("../controllers/diary.controller");
const router = Router();
const { protected } = require("../middlewares/auth");

router.get("/my", protected, getMyDiary);
router.get("/update/:id", protected, updateDiaryPage);
router.get("/:id", protected, getDiaryById);

router.post("/update/:id", protected, updateDiary);
router.post("/delete/:id", protected, deleteDiary);
router.post("/comment/:id", protected, addCommentToDiary);
router.post("/add", protected, addNewDiary);

module.exports = router;
