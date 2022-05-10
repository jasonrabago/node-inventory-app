const express = require('express')
const router = express.Router()
const {get, getBeers, setBeer, updateBeer, deleteBeer} = require('../controllers/beerController')

router.route('/').get(getBeers).post(setBeer)


router.route('/:id').delete(deleteBeer).put(updateBeer)

module.exports =router