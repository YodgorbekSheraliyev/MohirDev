const {Router} = require('express');
const { getAddUsersPage, addNewUser } = require('../controllers/users');
const router = Router();

router.get('/add-user', getAddUsersPage)

router.post('/users', addNewUser);

exports.router = router