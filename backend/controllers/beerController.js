const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');

const Beer = require('../models/beerModel');
const User = require('../models/userModel');

//@desc     Get goals
//@route    GET /api/beers
//@access Private
const getBeers = asyncHandler(async (req, res) => {
  const beers = await Beer.find({ user: req.user.id });

  res.status(200).json(beers);
});

//@desc     Set goals
//@route    POST /api/beers
//@access Private
const setBeer = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a TEXT field');
  }

  const beer = await Beer.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(beer);
});

//@desc     Update goals
//@route    PUT /api/beers/:id
//@access Private
const updateBeer = asyncHandler(async (req, res) => {
  const beer = await Beer.findById(req.params.id);

  if (!beer) {
    res.status(400);
    throw new Error('Beer not found');
  }
  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure logged in user matches the beer user
  if (beer.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedBeer = await Beer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBeer);
});

//@desc     Delete goals
//@route    DELETE /api/beers/:id
//@access Private
const deleteBeer = asyncHandler(async (req, res) => {
  const beer = await Beer.findById(req.params.id);

  if (!beer) {
    res.status(400);
    throw new Error('Beer not found');
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure logged in user matches the beer user
  if (beer.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await beer.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBeers,
  setBeer,
  updateBeer,
  deleteBeer,
};
