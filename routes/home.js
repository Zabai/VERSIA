var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');
    var loggedUserId = req.user.id;
    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:me AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:me AND friend_request=1)",
        {me: loggedUserId}, function(err, friends) {
            if(err) console.log(err);
            else {
                client.query("SELECT DISTINCT posts.user_id, name, content, `date`, profiles.image_profile\n" +
                    "FROM posts\n" +
                    "INNER JOIN friends ON (posts.user_id=friends.sender OR posts.user_id=friends.receiver)\n" +
                    "INNER JOIN profiles ON posts.user_id=profiles.user_id\n" +
                    "WHERE friends.friend_request=1 AND (friends.sender=:user OR friends.receiver=:user)\n" +
                    "ORDER BY `date` DESC LIMIT 5;",
                    {user: loggedUserId},
                    function (err, posts) {
                    if (err) console.log(err);
                    else {
                        console.log('POSTS: ', posts);
                        res.render('home/index', {posts: posts,friends: friends, signupMessage: req.flash('signupMessage')});
                    }
                    });

            }

        });

    client.end();
});

module.exports = router;