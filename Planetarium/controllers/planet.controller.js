const Star = require("../models/star.model");
const Planet = require("../models/planet.model");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc   Get all planets
// @route  GET api/v1/planets
// @access Public / wih apiKey
exports.getAllPlanets = asyncHandler(async (req, res, next) => {
  const planets = await Planet.find();

  res.status(200).json({ success: true, data: planets });
});

// @desc   Get planet by id
// @route  GET api/v1/planets/:id
// @access Public / wih apiKey
exports.getPlanetById = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);

  res.status(200).json({ success: true, data: planet });
});

// @desc   Create new planet
// @route  POST api/v1/planets
// @access Private/Admin
exports.createPlanet = asyncHandler(async (req, res, next) => {
  const star = await Star.findOne({ name: req.body.star });
  const newPlanet = await Planet.create({
    name: req.body.name,
    distanceToStar: req.body.distanceToStar,
    diametr: req.body.diametr,
    yearDuration: req.body.yearDuration,
    dayDuration: req.body.dayDuration,
    satellites: req.body.satellites,
    temperature: req.body.temperature,
    sequenceNumber: req.body.sequenceNumber,
    image: "uploads" + req.file.filename,
    star: star._id,
  });

  await Star.findOneAndUpdate(
    { name: req.body.star },
    { $push: { planets: newPlanet._id } },
    { new: true, upsert: true }
  );
  res.status(201).json({ success: true, data: newPlanet });
});

// @desc   Update planet
// @route  PUT api/v1/planets/:id
// @access Private/Admin
exports.updatePlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);
  const editedPlanet = {
    name: req.body.name || planet.name,
    distanceToStar: req.body.distanceToStar || planet.distanceToStar,
    diametr: req.body.diametr || planet.diametr,
    yearDuration: req.body.yearDuration || planet.yearDuration,
    dayDuration: req.body.dayDuration || planet.dayDuration,
    satellites: req.body.satellites || planet.satellites,
    temperature: req.body.temperature || planet.temperature,
    sequenceNumber: req.body.sequenceNumber || planet.sequenceNumber,
  };
  const updatedPlanet = await Planet.findByIdAndUpdate(
    req.params.id,
    editedPlanet,
    { new: true }
  );

  res.status(201).json({ success: true, data: updatedPlanet });
});

// @desc   Delete planet
// @route  DELETE api/v1/planets/:id
// @access Private/Admin
exports.deletePlanet = asyncHandler(async (req, res, next) => {
    await Planet.findByIdAndDelete(req.params.id)

    res.status(200).json({success: true, message: 'Planet deleted successfully'})
})