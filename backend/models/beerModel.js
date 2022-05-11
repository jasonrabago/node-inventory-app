const mongoose = require('mongoose')

const beerSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please enter a beer']
    }
}, 
{
    timestamps: true,
}
)

module.exports = mongoose.model('Beer', beerSchema)