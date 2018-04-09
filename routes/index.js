var express = require('express');
var router = express.Router();
var myPassport = require('../config/passport');

router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login', myPassport.authenticate('local', {failureRedirect: '/'}),
    function(req, res, next) {
        res.redirect('/home/users');
    });

router.post('/signup', myPassport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('index');
});

/* MIDDLEWARE to make sure a user is logged in */
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();

    res.redirect('index');
}

module.exports = router;