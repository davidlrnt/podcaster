var express = require('express');
var router = express.Router();
// var Podcast = mongoose.model('podcasts', Podcast);

/* GET users listing. */


// module.exports = router;

module.exports = function(mongoose) {
    // var router = express.Router();
 //    mongoose.set('debug', true);
    var Podcast = mongoose.model('Podcast', Podcast, 'podcast');
 //    var dbUrl = process.env.MONGOHQ_URL || 'mongodb://localhost/podcaster';
	// var connection = mongoose.createConnection(dbUrl);


	router.get('/', function(req, res, next) {
	  // res.send('respond with a resource');
	  	console.log(req.query.name)
	  	// res.render('podcasts', { title: 'Podcasts' });
		Podcast.findByName(req.query.name, function (err, docs) {
			console.log(err)
			console.log(docs)
		    res.json(docs);
		    res.render('podcasts', { title: 'Podcasts' });

		});

// var query  = Podcast.where({ color: 'white' });
// query.findOne(function (err, data) {
// 	console.log("yeah")
//   if (err) {
//   	console.log(err)
//   	return handleError(err);
//   }
//   if (data) {
//     // doc may be null if no document matched
//   }
// });

	});
	console.log("about to return router")
    return router;
};
