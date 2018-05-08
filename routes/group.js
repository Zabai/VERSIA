var express = require('express');
var router = express.Router();

router.post("/new", function (req, res, next) {
    var client = require('../db/db');
    var group_id = 0;
    var group = JSON.parse(req.body.group);
    client.query("INSERT INTO groups (name, description, group_admin) VALUES (:name, :description, :admin)",
        {name: group.name, description: group.description, admin: req.user.id}, function (err, result) {
            if (err) console.log(err); //return res.status(500).send({message: "Ha habido un error en la db: " + err});
            group_id = result.info.insertId;
            var query = "INSERT INTO group_members (`group`, `member`, group_request) VALUES  ";
            var members = "";
            for (var i in group.members) {
                members += "(:group_id, " + group.members[i] + ", 0), "
            }
            query = query + members.slice(0, -2);

            client.query(query,
                {group_id: group_id}, function (err) {
                    if (err) console.log(err); //return res.status(500).send({message: "Ha habido un error en la db: " + err});
                    //return res.status(200).send({status: "success"});
                });

            client.query("INSERT INTO group_members (`group`, `member`, group_request) VALUES (:group_id, :member, 1)",
                {group_id: group_id, member: req.user.id}, function (err) {
                    if (err) console.log(err); //return res.status(500).send({message: "Ha habido un error en la db: " + err});
                    res.send('/home');
                });
        });
    client.end();
});

router.get("/new", function (req, res, next) {
    var client = require('../db/db');

    var groups = {};
    //parte grupos
    client.query("SELECT name FROM groups WHERE id IN " +
        "(SELECT `group`FROM group_members WHERE `member`=:member AND group_request=1)", {member: req.user.id}, function (err, groupsRows) {
        if (err) return res.status(500).send({message: "Ha habido un error en la db" + err});
        groups = groupsRows;

    });
    //parte amigos
    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:user AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:user AND friend_request=1)",
        {user: req.user.id}, function (err, friends) {
            if (err) console.log(err);
            else res.render("group/new", {friends: friends, groups: groups});
        });

    client.end();
});

module.exports = router;