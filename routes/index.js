var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var podcast = require('../models/podcast.js');

var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@127.0.0.1:27017/podcaster';
var mongoose = require('mongoose');
var connection = mongoose.createConnection(dbUrl);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
  console.info('Connected to database')
});

function db (req, res, next) {
  req.db = {
    User: connection.model('User', user, 'users'),
    Podcast: connection.model('Podcast', podcast, 'podcasts')
  };
  return next();
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
