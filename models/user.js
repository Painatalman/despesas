'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
    email: {
        type: String,
        lowercase: true
    },
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



// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // console.log(candidatePassword);

  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    // console.log(err, isMatch);

    if (err) {
      return callback(err);
    }

    // console.log(isMatch)

    return callback(null, isMatch);
  })
}

// on every save, add the date
userSchema.pre('save', function(next) {
  // console.log('saving schema')

    // get the current date
    var currentDate = new Date();
    var user = this;

    // change the updated_at field to current date
    this.date_updated = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.date_created)
        this.date_created = currentDate;

    var salt = 10;
    user.password = bcrypt.hashSync(user.password, salt);

    next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
