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
	password: String,
	photoUrl: String,
	favorites: [{
	    type: Schema.Types.ObjectId,
	    ref: 'Podcast'
	}],
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

exports.User = User;