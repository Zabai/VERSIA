var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function(req, res) {
    res.render('index');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to home
    failureRedirect : 'index', // redirect back to the signup page if there is an error
}));

router.get('/signup', function(req, res) {
    res.render('index');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : 'index', // redirect to home
    failureRedirect : 'index', // redirect back to the index page if there is an error
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