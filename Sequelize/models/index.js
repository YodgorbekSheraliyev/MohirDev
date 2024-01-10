const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("diarybook", "postgres", '5481', {
  host: "localhost",
  port: 5400,
  dialect: "postgres",
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.diary = require('./diary.model')(sequelize, Sequelize)
db.comment = require('./comment.model')(sequelize, Sequelize)

db.diary.hasMany(db.comment, {as: 'comment'});
db.comment.belongsTo(db.diary, {foreignKey: 'diaryId', as: 'diary'})

module.exports = db;
