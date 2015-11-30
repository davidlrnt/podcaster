var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Podcast = mongoose.model( 'Podcast' );

router.get('/', function(req, res, next) {
 	// res.send('respond with a resource');
  	console.log(req.query.name)
   	// res.render('podcasts', { title: 'Podcasts' });
	// Podcast.findByName(req.query.name, function (err, docs) {
	// 	console.log(err)
	// 	console.log(docs)
	//     res.json(docs);
	//     res.render('podcasts', { title: 'Podcasts' });
	// });

	var query  = Podcast.where({ color: 'white' });
	query.findOne(function (err, data) {
		console.log("yeah")
	  if (err) {
	  	console.log(err)
	  	return handleError(err);
	  }
	  if (data) {
	    // doc may be null if no document matched
	  }
	});
});

module.exports = router;
