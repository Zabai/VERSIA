var express = require('express');
var router = express.Router();

router.get("/new", function(req, res, next) {
    var client = require('../db/db');

    var groups = {};
    client.query("SELECT name FROM groups WHERE id IN " +
        "(SELECT `group`FROM group_members WHERE `member`=:member AND group_request=1)", {member: req.user.id}, function(err, groupsRows) {
        if(err) return res.status(500).send({message: "Ha habido un error en la db" + err});
        groups = groupsRows;

    });

    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:user AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:user AND friend_request=1)",
        {user: req.user.id}, function(err, friends) {
            if(err) console.log(err);
            else res.render("group/new", {friends: friends, groups: groups});
        });

    client.end();
});

router.post("/new", function(req, res, next) {
    var client = require('../db/db');
    var group_id;
    var group = req.body.group;

    client.query("INSERT INTO groups (name, description, group_admin) VALUES (:name, :description, :admin)",
        {name: group.name, description: group.description, admin: req.user.id}, function(err, result) {
            if(err) res.status(500).send({message: "Ha habido un error en la db: " + err});
            group_id = result.info.insertId;

            var members = "";
            group.members.forEach(function(value) {
                members += "(:group_id, " + value + ", 0), ";
            });

            var query = "INSERT INTO group_members (`group`, `member`, group_request) VALUES  " + members.slice(0, -2);
            client.query(query, {group_id: group_id},
                function(err) {
                    if(err) res.status(500).send({message: "Ha habido un error en la db: " + err});
                });

            client.query("INSERT INTO group_members (`group`, `member`, group_request) VALUES (:group_id, :member, 1)",
                {group_id: group_id, member: req.user.id}, function(err) {
                    if(err) res.status(500).send({message: "Ha habido un error en la db: " + err});
                    res.status(200).send('/home');
                });
        });

    client.end();
});

module.exports = router;