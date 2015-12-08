var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Podcast = mongoose.model('Podcast');
var request = require('request');
var xml2js = require('xml2js');

router.get('/', function(req, res, next) {
 	// res.send('respond with a resource');
  var query = req.query.name;
  var itunesUrl = 'https://itunes.apple.com/search'
  // res.render('podcasts', { title: 'Podcasts' });
	// Podcast.findByName(req.query.name, function (err, docs) {
	// 	console.log(err)
	// 	console.log(docs)
	//     res.json(docs);
	//     res.render('podcasts', { title: 'Podcasts' });
	// });
	request({url:itunesUrl, qs:{term:query, entity:'podcast'}}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var results = JSON.parse(body).results
		  console.log(results)
		  res.render('podcast_search_results', { podcasts: results });
		}
	})
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
