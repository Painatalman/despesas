// para movimentos cíclicos, as regras que se mantêm!
// aparecerão na página de movimentos, e ao se clicar num, a página será preenchida

var mongoose = require('mongoose'),
    enumerates = require('./enums/movimento.js');

var padraoMovimentoSchema = new mongoose.Schema({
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
    type: {
        // despesas:
        //   'sh','fd','o' -> shopping, food, other
        // credito:
        //   's', 'g', 'o' -> salary, gift, other
        type: String,
        enum: enumerates.expense_types.concat(enumerates.income_types),
    },
    schedule: {
        // w: semanal, m: mensal, a: anual
        type: String,
        enum: enumerates.schedules,
        default: 'm' // mensal
    },
    value: {
        type: Number,
        required: true,
        default: 0.00
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Schedule', padraoMovimentoSchema);
