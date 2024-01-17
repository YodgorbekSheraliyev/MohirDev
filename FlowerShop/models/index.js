const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('flowershop', 'postgres',  '5481', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5400
})

const db = {};
db.flower = require('./flower.model')(sequelize, DataTypes);
db.sequelize = sequelize

module.exports = db