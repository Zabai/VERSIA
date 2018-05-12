var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');
    var loggedUserId = req.user.id;

    var groups = {};
    client.query("SELECT name FROM groups WHERE id IN " +
        "(SELECT `group`FROM group_members WHERE `member`=:member AND group_request=1)", {member: req.user.id}, function(err, groupsRows) {
        if(err) return res.status(500).send({message: "Ha habido un error en la db" + err});
        groups = groupsRows;

    });


    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:me AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:me AND friend_request=1)",
        {me: loggedUserId}, function(err, friends) {
            if(err) console.log(err);
            else {
                if (friends.info.numRows === "0") {
                    client.query("SELECT DISTINCT posts.id, posts.user_id, name, content, `date`, profiles.image_profile\n" +
                        "FROM posts\n" +
                        "INNER JOIN profiles ON profiles.user_id=posts.user_id\n" +
                        "WHERE posts.user_id=:user;",
                        {user: loggedUserId},
                        function (err, posts) {
                            if (err) console.log(err);
                            else {
                                res.render('home/index', {posts: posts,friends: friends, signupMessage: req.flash('signupMessage')});
                            }
                        });
                } else {
                    client.query("SELECT DISTINCT posts.id, posts.user_id, name, content, `date`, profiles.image_profile\n" +
                        "FROM posts\n" +
                        "INNER JOIN friends ON (posts.user_id=friends.sender OR posts.user_id=friends.receiver)\n" +
                        "INNER JOIN profiles ON posts.user_id=profiles.user_id\n" +
                        "WHERE friends.friend_request=1 AND (friends.sender=:user OR friends.receiver=:user)\n" +
                        "ORDER BY `date` DESC;",
                        {user: loggedUserId},
                        function (err, posts) {
                            if (err) console.log(err);
                            else {
                                res.render('home/index', {posts: posts,friends: friends, signupMessage: req.flash('signupMessage')});
                           }
                        }
                    );
                }
            }
        });
    client.end();
});

module.exports = router;