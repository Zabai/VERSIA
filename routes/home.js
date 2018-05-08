var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');

    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:me AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:me AND friend_request=1)",
        {me: req.user.id}, function(err, friends) {
            if(err) console.log(err);
            else {
                client.query("select date, content, profiles.name from posts INNER JOIN profiles on profiles.user_id=posts.user_id ORDER BY date DESC LIMIT 10", function (err, posts) {
                    if(err)console.log(err);
                    console.log(JSON.stringify(posts));
                    res.render('home/index', {friends: friends, signupMessage: req.flash('signupMessage'), posts: posts});
                });
            }
        });

    client.end();
});

module.exports = router;