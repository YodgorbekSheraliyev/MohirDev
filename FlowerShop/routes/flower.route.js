const { Router } = require("express");
const { getALlFlowersPage, createFlower, buyFlowerByIdPage, buyFlowerById } = require("../controllers/flower.controller");
const router = Router()

router.get('/', getALlFlowersPage)
router.post('/add', createFlower)
router.get('/flowers/buy/:id', buyFlowerByIdPage)
router.post('/flowers/buy/:id', buyFlowerById)

module.exports = router