const { Router } = require("express");
const router = Router();
const {
  getAllStars,
  createNewStar,
  getStarById,
  updateStar,
  deleteStar,
} = require("../controllers/star.controller");
const upload = require("../utils/fileUpload");
const {protected, accessAdmin, apiKeyAccess} = require('../middlewares/auth')

router.get("/", apiKeyAccess, getAllStars);
router.post("/", protected, accessAdmin, upload.single('image'), createNewStar);
router.get("/:id", apiKeyAccess, getStarById);
router.put("/:id", protected, accessAdmin, updateStar);
router.delete("/:id", protected, accessAdmin, deleteStar);

module.exports = router;
