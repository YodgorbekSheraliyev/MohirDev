const uuid = require("uuid");
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require('../middlewares/async')

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const apiKey = uuid.v4();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({name, email, password: hashedPassword, apiKey,});
    res.status(201).json({success: true, data: user,});

    // res.status(500).json({success: false, message: error.message,});
})
