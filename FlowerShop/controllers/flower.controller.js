const { Sequelize } = require("sequelize");
const db = require("../models");
const Flower = db.flower;
const Reservation = db.reservation;
// const sequelize = new Sequelize()
// const Dlower = sequelize.define()

const getALlFlowersPage = async (req, res) => {
  const flowers = await Flower.findAll({
    raw: true,
    // limit: 10
  });
  res.render("flowers/flowers", {
    title: "Flowers",
    flowers: flowers,
  });
};

const buyFlowerByIdPage = async (req, res) => {
  const flower = await Flower.findByPk(req.params.id, { raw: true });
  res.render("flowers/buy-flower", {
    title: "Buy Flower",
    flower,
    error: req.flash('error')
  });
};

const buyFlowerById = async (req, res) => {
  const { fullName, phoneNumber, region } = req.body;
  if(!fullName || !phoneNumber || !region){
    req.flash('error', 'Fullname , Phone number and regions must be filled.')
    return res.redirect(`/flowers/buy/${req.params.id}`)
  }
  
  if(phoneNumber.trim().length <=4){
    req.flash('error', 'Phone number must be filled.')
    return res.redirect(`/flowers/buy/${req.params.id}`) 
  }
  await Reservation.create({
    region,
    fullName,
    phone: phoneNumber,
    productId: req.params.id,
  });
  res.redirect("/")
};

const createFlower = async (req, res) => {
  const { title, image, description, amount, price } = req.body;
  const newFlower = await Flower.create(
    { title, image, description, amount, price },
    { returning: true }
  );
  res.status(201).send(newFlower);
};

const deleteFlower = async (req, res) => {
  await Flower.destroy({ where: { id: req.params.id } });
};
module.exports = {
  getALlFlowersPage,
  buyFlowerByIdPage,
  buyFlowerById,
  createFlower,
  deleteFlower
};
