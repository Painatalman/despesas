var mongoose = require('mongoose'),
    Lista = require('./lista.js'),
    Padrao = require('./padrao_movimento.js'),
    enumerates = require('./enums/movimento.js');

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
        required: false
        // default: false
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        // despesas:
        //   'sh','fd','o' -> shopping, food, other
        // credito:
        //   's', 'g', 'o' -> salary, gift, other
        type: String,
        enum: enumerates.expense_types.concat(enumerates.income_types),
    },
    value: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    lista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lista',
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
    }
});


module.exports = mongoose.model('Movimento', movimentoSchema);
