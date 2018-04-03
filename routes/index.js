var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

// ========================================
/* LOGIN */
// ========================================


router.get('/login', function(req, res) {
    res.render('index');
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

// ========================================
/* SIGNUP */
// ========================================

router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

/* LOGOUT */

router.get('/logout', function(req, res) {
    res.logout();
    res.redirect('index');
});

router.get('/search', function(req, res, next) {
    res.render('search',
        {users: [
                {
                    name: "Carlos Martel Lamas",
                    degree: "Computer Science",
                    university: "ULPGC"
                },
                {
                    name: "Zabai el BuscaLolis",
                    degree: "Loli Stalking",
                    university: "UCM"
                },
                {
                    name: "Geraldo The Black One",
                    degree: "Police Escapism",
                    university: "Jail"
                }
        ]});
});

/* MIDDLEWARE to make sure a user is logged in */

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('index');
}

}