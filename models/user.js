var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema ({
	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
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


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);