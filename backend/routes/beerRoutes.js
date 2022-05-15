const express = require('express');
const router = express.Router();
const {
  get,
  getBeers,
  setBeer,
  updateBeer,
  deleteBeer,
} = require('../controllers/beerController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBeers).post(protect, setBeer);

router.route('/:id').delete(protect, deleteBeer).put(protect, updateBeer);

module.exports = router;
