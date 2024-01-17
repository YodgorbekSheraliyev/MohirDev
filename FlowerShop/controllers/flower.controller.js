const db = require('../models')
const Flower = db.flower


const getALlFlowersPage = async (req, res) => {
    const flowers = await Flower.findAll({
        raw: true
    });
    res.render('flowers/flowers', {
        title: 'Flowers',
        flowers: flowers,
    })
}

module.exports = {
    getALlFlowersPage
}