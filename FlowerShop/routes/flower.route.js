const { Router } = require("express");
const { getALlFlowersPage } = require("../controllers/flower.controller");
const router = Router()

router.get('/', getALlFlowersPage)

module.exports = router