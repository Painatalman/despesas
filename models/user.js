var mongoose = require('mongoose');

module.exports = mongoose.model('User',new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    isMale: Boolean
}));