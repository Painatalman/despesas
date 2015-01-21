var mongoose = require('mongoose');

module.exports = mongoose.model('Conta',new mongoose.Schema({
    user: String
}));