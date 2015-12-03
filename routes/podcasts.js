var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Podcast = mongoose.model('Podcast');

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
	  if (err) {
	  	console.log(err)
	  	return handleError(err);
	  }
	  if (data) {
	    // doc may be null if no document matched
	  }
	});
});

router.get('/new', function(req, res, next) {
	res.render('podcast_new')
});

router.post('/new', function(req, res, next) {
  var rssUrl = req.body.rssUrl;
	var pod = new Podcast({rssUrl: rssUrl});
	pod.parseUrl(function(obj){
  	obj.save( function( err, podcast ){
			if(!err){
				console.log('_id of saved podcast: ' + podcast._id);
				res.render('podcast_show', {podcast: obj})
			} 
		});
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id
	res.render('podcast_show', { podcast_id: id})
});

module.exports = router;
