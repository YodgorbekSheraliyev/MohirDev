const { Router } = require("express");
const router = Router()
const { Sequelize } = require("sequelize");
const db = require("../models");
// const Admin = db.admin;
const sequelize = new Sequelize()
const Admin = sequelize.define("admin");

router.get('/register', (req, res) => {
    res.render('flowers/register', {
        title: "Admin Page",
        error: req.flash('registerError')
    })
})

router.get('/login', (req, res) => {
    res.render('flowers/login')
})

router.get('/admin/dashboard', (req, res) => {
    res.render('flowers/admin-dashboard')
})

router.post('admin/auth/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body
    if(!firstName || !lastName || !email || !password){
        req.flash("registerError", "All fields must be filled!!!")
        return res.redirect('/admin/auth/register')
    }
    req.session.user = {
        user: req.body.firstName,
        email: req.body.email
    }
    req.session.save(async (err) => {
        if(err) throw err
        const admin = await Admin.create(req.body)
        res.redirect('/admin/dashboard')
        console.log(admin)
    })
    // res.redirect('/admin/dashboard')
})

router.get('admin/auth/login', async ( req, res) => {
    const userExist = await Admin.findOne({where: {email: req.body.email}})
    if(userExist){
        const matchPassword = (req.body.password === userExist.password);
        if(matchPassword){
            req.session.user = userExist
            req.session.save(err => {
                if(err) throw err
                return res.redirect("/admin/dashboard")
            })
        }
    }
})

module.exports = router