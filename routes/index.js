var express = require('express');
var router = express.Router();
var myPassport = require('../config/passport');

router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to home
    failureRedirect : '/',  // redirect back to the signup page if there is an error
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to home
    failureRedirect : '/', // redirect back to the index page if there is an error
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