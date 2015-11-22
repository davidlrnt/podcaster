var express = require('express');
var router = express.Router();

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

var User       = require('../models/user');
var secrets = require('../conf/secrets');


/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('index', { title: 'AHA' });
});

router.post('/login',
  // passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(req.user)
    res.redirect('/users/' + req.user.username);
});


// route for facebook authentication and login
// different scopes while logging in
router.get('/login/facebook', 
  passport.authenticate('facebook', { scope : 'email' }
));
 
// handle the callback after facebook has authenticated the user
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect : '/home',
//     failureRedirect : '/'
//   // })
// );

router.get('/auth/facebook/callback', function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
}

);



    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
passport.use('facebook', new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID        : secrets.facebook.id,
        clientSecret    : secrets.facebook.secret,
        callbackURL     : secrets.facebook.callback

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
    	console.log(token)
    	console.log(refreshToken)
    	console.log(profile)
    	console.log(done)
    	debugger;
        // asynchronous
        process.nextTick(function() {
        	console.log(user)
            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id                   
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                    newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));



module.exports = router;
