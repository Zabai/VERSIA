var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');
    var groups = {};
    client.query("SELECT name FROM groups WHERE id IN " +
        "(SELECT `group`FROM group_members WHERE `member`=:member AND group_request=1)",{member: req.user.id},function (err, groupsRows) {
        if(err)return res.status(500).send({message: "Ha habido un error en la db" + err});
        groups = groupsRows;

    });
    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:me AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:me AND friend_request=1)",
        {me: req.user.id}, function(err, friends) {
            if(err) console.log(err);
            else res.render('home/index', {groups: groups, friends: friends, signupMessage: req.flash('signupMessage')});
        });

    client.end();
});

module.exports = router;