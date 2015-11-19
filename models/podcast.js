var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Podcast = new Schema ({
	name: {
		required: true,
		type: String,
	    trim: true,
	    max: 100
	},
	rssUrl: {
		required: true,
		type: String,
	    trim: true,
	    max: 300,
	},
	photoUrl: String,
	episodes: [{
	    title: {
	      	type: String,
	      	trim: true,
	      	max:200
		}, 
		description: {
			type: String,
	      	trim: true,
	      	max:2000
		},
		language: {
			type: String,
	      	trim: true,
	      	max:20
		},
		date: {
			type: Date,
		},
		author: {
	      	id: {
	        	type: Schema.Types.ObjectId,
	        	ref: 'Podcast'
			},
	    name: String
	    }
	}],
})

exports.Podcast = Podcast;