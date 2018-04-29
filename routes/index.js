var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
    if(req.user === undefined)
        res.render('index', {title: 'Express', errorMessage: req.flash('errorMessage'), signupMessage: req.flash('signupMessage') });
    else
        res.redirect("/home");
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home', // redirect to home
    failureRedirect : '/',  // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/home', // redirect to home
    failureRedirect : '/', // redirect back to the index page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;