const {Router} = require('express');
const router = Router();

const users = []

router.get('/add-user', (req, res) => {
    res.render('add-users', {
        title: 'Add new user'
    })
})

router.post('/users', (req, res) => {
    users.push({username: req.body.username, age: req.body.age})
    res.redirect('/')
})

exports.router = router
exports.users = users