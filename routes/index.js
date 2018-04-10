var express = require('express');
var router = express.Router();
var myPassport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {title: 'Express', errorMessage: req.flash('errorMessage'), signupMessage: req.flash('signupMessage') });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to home
    failureRedirect : '/',  // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to home
    failureRedirect : '/', // redirect back to the index page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* MIDDLEWARE to make sure a user is logged in */
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;