var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    var client = require('../db/db');

    client.query("SELECT * FROM profile WHERE email IN " +
        "(SELECT sender FROM friends WHERE receiver=:user AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:user AND friend_request=1)",
        {user: req.user.email}, function(err, friends) {
            if(err) console.log(err);
            else res.render("group/new", {friends: friends});
        });

    client.end();
});

router.post("/:id/create", function (req, res, next) {
   var client = require('../db/db');
   var id_group = 0;

   client.query("INSERT INTO groups (name, description, admin_group) VALUES (:name, :description, :admin)",
       {name: req.body.groupname, description: req.body.description, admin: req.user.email},function (err, result) {
           if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
           id_group = result.info.insertId;

           client.query("INSERT INTO members_groups (id_of_group, email_member, petition) VALUES (:id_group, :member, 0)",
               {id_group: id_group , member: req.user.email},function (err) {
                   if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
                   return res.status(200).send({status: "success"});
           });
   });
   
   client.end();
});

module.exports = router;