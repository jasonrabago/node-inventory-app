const expressAsyncHandler = require('express-async-handler')
const asyncHandler = require('express-async-handler')

//@desc     Get goals
//@route    GET /api/beers
//@access Private

const getBeers = asyncHandler (async (req, res) => {
    res.status(200).json({message: 'Get beers'})
})

//@desc     Set goals
//@route    POST /api/beers
//@access Private

const setBeer = asyncHandler (async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a TEXT field')
    }

    res.status(200).json({message: 'Set beers'})
})

//@desc     Update goals
//@route    PUT /api/beers/:id
//@access Private

const updateBeer = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Update beers ${req.params.id}`})
})

//@desc     Delete goals
//@route    DELETE /api/beers/:id
//@access Private

const deleteBeer = asyncHandler (async (req, res) => {
    res.status(200).json({message: `Delete beers ${req.params.id}`})
})

module.exports = {
    getBeers,
    setBeer,
    updateBeer,
    deleteBeer,
}