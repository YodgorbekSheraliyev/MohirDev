const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('flowershop', 'postgres',  '5481', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5400
})

const db = {};

db.flower = require('./flower.model')(sequelize, DataTypes);
db.admin = require('./admin.model')(sequelize, DataTypes)
db.comment = require('./comment.model')(sequelize, DataTypes)
db.reservation = require('./reservation.model')(sequelize, DataTypes)

db.sequelize = sequelize

module.exports = db