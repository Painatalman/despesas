'use strict';
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    email: String,
    isMale: Boolean,
    date_created: Date,
    date_updated: Date,
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
    // add some stuff to the users name
    this.name = this.name + '-dude';

    return this.name;
};

var User = mongoose.model('User', userSchema);

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function () {
    // add some stuff to the users name
    if (this.name) {
        return (this.name + '-dude');
    } 

    return 'nameless dude';

};

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.date_updated = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.date_created)
        this.date_created = currentDate;

    next();
});

module.exports = User;
