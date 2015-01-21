var mongoose = require('mongoose');

var movimentoSchema = new mongoose.Schema({
    conta: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    isDespesa: {
        type: Boolean,
        required: true,
        default: true
    },
    wasPaidByOther: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Movimento', movimentoSchema);
