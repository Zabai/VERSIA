var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');

    client.query("SELECT * FROM profile WHERE email IN " +
        "(SELECT sender FROM friends WHERE receiver=:me AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:me AND friend_request=1)",
        {me: req.user.email}, function(err, friends) {
            if(err) console.log(err);
            else res.render('home/index', {friends: friends, signupMessage: req.flash('signupMessage')});
        });

    client.end();
});

module.exports = router;