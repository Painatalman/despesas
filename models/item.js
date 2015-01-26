var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
});


module.exports = mongoose.model('Item', itemSchema);
