module.exports = {
	'url': 'mongodb://localhost/despesas',
	'init': function(){
		var mongoose = require('mongoose');
		mongoose.connect(this.url);
	}
}