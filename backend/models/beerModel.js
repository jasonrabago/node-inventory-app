const mongoose = require('mongoose');

const beerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please enter a beer'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Beer', beerSchema);
