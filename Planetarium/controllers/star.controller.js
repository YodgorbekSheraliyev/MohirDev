const Star = require("../models/star.model");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc   Get all stars
// @route  GET api/v1/stars
// @access Public / wih apiKey
exports.getAllStars = asyncHandler(async (req, res, next) => {
  const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 5;
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || pageLimit);
  const total = await Star.countDocuments();

  const stars = await Star.find()
    .skip((page - 1) * limit)
    .limit(limit);
  res
    .status(200)
    .json({
      success: true,
      data: stars,
      pageCount: Math.ceil(total / limit),
      currentPage: page,
      nextPage: Math.ceil(total / limit) < page + 1 ? null : page + 1,
    });
});

// @desc   Get  star by id
// @route  GET api/v1/stars/:id
// @access Public / wih apiKey
exports.getStarById = asyncHandler(async (req, res, next) => {
  const star = await Star.findById(req.params.id);

  res.status(200).json({ success: true, data: star });
});

// @desc   Create new star
// @route  POST api/v1/stars
// @access Private/Admin
exports.createNewStar = asyncHandler(async (req, res, next) => {
  const newStar = await Star.create({
    name: req.body.name,
    temperature: req.body.temperature,
    massa: req.body.massa,
    diametr: req.body.diametr,
    image: "uploads/" + req.file.filename,
  });

  res.status(201).json({ success: true, data: newStar });
});

// @desc   Update star
// @route  PUT api/v1/stars/:id
// @access Private/Admin
exports.updateStar = asyncHandler(async (req, res, next) => {
  const star = await Star.findById(req.params.id);
  const editedStar = {
    name: req.body.name || star.name,
    temperature: req.body.temperature || star.temperature,
    massa: req.body.massa || star.massa,
    diametr: req.body.diametr || star.diametr,
  };
  const updatedStar = await Star.findByIdAndUpdate(req.params.id, editedStar, {
    new: true,
  });

  res.status(201).json({ success: true, data: updatedStar });
});

// @desc   Delete star
// @route  DELETE api/v1/stars/:id
// @access Private/Admin
exports.deleteStar = asyncHandler(async (req, res, next) => {
  await Star.findByIdAndDelete(req.params.id);

  res.status(201).json({ success: true, message: "Star deleted successfully" });
});
