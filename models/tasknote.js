'use strict';
var mongoose = require('mongoose');

var tasknoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    image: {
        type: String
    },

    lista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lista',
    },
    // for tasks
    date: {
        type: Date,
    },
    isUrgent: {
        type: Boolean,
        required: false,
        // default: false
    },
    isDone:{
        type: Boolean,
        default: false
    },
    // meta
    date_added: {
        type: Date,
        default: Date.now
    },
});

// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
tasknoteSchema.methods.isOverdue = function() {
    // check current dates
    
    var currentDate = new Date();
    
    return this.date >= currentDate;
};

tasknoteSchema.methods.isCurrent = function() {
    // check current dates
    
    var currentDate = new Date();
    
    return this.date === currentDate;
};

// PRE/POST

// on every save, add the date
tasknoteSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.date_updated = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.date_created)
        this.date_created = currentDate;

    next();
});

var Tasknote = mongoose.model('Tasknote', tasknoteSchema);



module.exports = Tasknote;
