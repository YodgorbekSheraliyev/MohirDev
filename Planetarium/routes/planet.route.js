const { Router } = require("express");
const router = Router();
const upload = require("../utils/fileUpload");
const {
  getAllPlanets,
  createPlanet,
  getPlanetById,
  updatePlanet,
  deletePlanet,
} = require("../controllers/planet.controller");

const {protected, accessAdmin, apiKeyAccess} = require('../middlewares/auth')


router.get("/", apiKeyAccess, getAllPlanets);
router.get("/:id", apiKeyAccess, getPlanetById);
router.post("/", protected, accessAdmin, upload.single("image"), createPlanet);
router.put("/:id", protected, accessAdmin, updatePlanet);
router.delete("/:id", protected, accessAdmin, deletePlanet);

module.exports = router;
