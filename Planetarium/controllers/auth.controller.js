const uuid = require("uuid");
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require('../middlewares/async')

// @desc   Register new user
// @route  POST api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const apiKey = uuid.v4();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({name, email, password: hashedPassword, apiKey,});
    const token = user.generateJwtToken();
    res.status(201).json({success: true, data: user,});

    // res.status(500).json({success: false, message: error.message,});
})

// @desc   Login user
// @route  POST api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body 

    // Validate email && password
    if(!email || !password){
        return next(new ErrorResponse('Email and password are required', 400))
    }

    const user = await User.findOne({email})

    // Check for the user
    if(!user){
        return next(new ErrorResponse('Invalid credentials', 401))
    }
    // Check for the password
    const isMatch = await user.matchPassword(password)
    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401))
    }
    const token = user.generateJwtToken();
    res.status(200).json({success: true, data: user, token})

})