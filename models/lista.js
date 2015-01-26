var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Item = require('./item.js');

var listaSchema = Schema({
    items: {
        type: [Schema.Types.ObjectId],
        ref: 'Item',
        validate: function(list){
            return list.length > 0;
        }
    }
});

