var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
	name: {
		required: true,
		type: String,
	    trim: true,
	    max: 100
	},
	email: {
		required: true,
		type: String,
	    trim: true,
	    max: 50,
	    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	},  
	approved: {
	    type: Boolean,
	    default: false
	}, 
	banned: {
	    type: Boolean,
	    default: false
	},
	admin: {
	    type: Boolean,
	    default: false
	}

})