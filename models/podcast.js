var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');
var xml2js = require('xml2js');

var podcastSchema = new Schema ({
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

podcastSchema.methods.parseUrl = function() {
	request(this.rssUrl, function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		xml2js.parseString(body, function (err, result) {
	  			console.log(result.rss.channel[0].title[0]);
	  			console.log(result.rss.channel[0]['itunes:image'])
			});
	  	}
	})

};

// exports.Podcast = Podcast;
module.exports = mongoose.model('Podcast', podcastSchema);
