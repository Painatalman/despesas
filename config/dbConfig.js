module.exports = {
	local: 'mongodb://localhost/despesas',
  remote: 'mongodb://Rambovskii:Ramborambo999@ds031631.mongolab.com:31631/despesas',
	init: function(isRemote){
		var mongoose = require('mongoose');

    if (!isRemote) {
      mongoose.connect(this.local);
    }
    else
		  mongoose.connect(this.remote);

    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
	}
}