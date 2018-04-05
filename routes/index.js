var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function(req, res) {
    res.render('index');
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res) {
    res.logout();
    res.redirect('index');
});

/* MIDDLEWARE to make sure a user is logged in */
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();

    res.redirect('index');
}
module.exports = router;