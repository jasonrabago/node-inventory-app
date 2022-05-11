const expressAsyncHandler = require('express-async-handler')
const asyncHandler = require('express-async-handler')

const Beer = require('../models/beerModel')


//@desc     Get goals
//@route    GET /api/beers
//@access Private
const getBeers = asyncHandler (async (req, res) => {
    const beers = await Beer.find()

    res.status(200).json(beers)
})


//@desc     Set goals
//@route    POST /api/beers
//@access Private
const setBeer = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a TEXT field')
    }

    const beer = await Beer.create({
        text: req.body.text,
    })

    res.status(200).json(beer)
})


//@desc     Update goals
//@route    PUT /api/beers/:id
//@access Private
const updateBeer = asyncHandler (async (req, res) => {
    const beer = await Beer.findById(req.params.id)

    if (!beer) {
        res.status(400)
        throw new Error ('Beer not found')
    }

    const updatedBeer = await Beer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedBeer)
})


//@desc     Delete goals
//@route    DELETE /api/beers/:id
//@access Private
const deleteBeer = asyncHandler (async (req, res) => {

    const beer = await Beer.findById(req.params.id)

    if (!beer) {
        res.status(400)
        throw new Error ('Beer not found')
    }

    await beer.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBeers,
    setBeer,
    updateBeer,
    deleteBeer,
}