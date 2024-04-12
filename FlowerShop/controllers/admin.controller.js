const { Sequelize } = require("sequelize");
const db = require("../models");
// const Flower = db.flower;
// const Admin = db.admin;
const sequelize = new Sequelize()
const Admin = sequelize.define("admin");

