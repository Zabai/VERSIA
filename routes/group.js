var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');
    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:user AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:user AND friend_request=1)",
        {user: req.user.id}, function(err, friends) {
            if(err) console.log(err);
            else res.render("group/new", {friends: friends});
        });

    client.end();
});

router.post("/:id/create", function (req, res, next) {
   var client = require('../db/db');

   client.query("INSERT INTO groups (name, description, group_admin) VALUES (:name, :description, :admin)",
       {name: req.body.groupname, description: req.body.description, admin: req.user.id},function (err, result) {
           if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
           group_id = result.info.insertId;

           client.query("INSERT INTO members_groups (group, member, group_request) VALUES (:group_id, :member, 0)",
               {group_id: group_id, member: req.user.id},function (err) {
                   if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
                   return res.status(200).send({status: "success"});
           });
   });
   client.end();
});

module.exports = router;