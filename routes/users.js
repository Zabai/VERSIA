var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var loggedUserId = req.user.id;

    var client = require('../db/db');
    client.query("SELECT DISTINCT * FROM friends WHERE receiver=:loggedUserId AND friend_request=0", {loggedUserId: loggedUserId}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        console.log(JSON.stringify(friendRequests));
        res.render("user/profile", {friendRequests: friendRequests});
    });
    client.end();
});


router.get('/search', function(req, res, next) {
    var client = require('../db/db');
    if(req.query.ajax) {
        client.query("SELECT email, name, surname FROM profile WHERE name LIKE :name AND email <> :currentUser",
            {name: req.query.search + "%", currentUser: req.user.email},
            function(err, students) {
                if(err) console.log(err);
                res.json(JSON.stringify(students));
            });
    } else {
        var friendsQuery = "SELECT receiver, friend_request from friends where sender = :loggedUserId AND (friend_request=0 OR friend_request=1)";
        var usersQuery = "SELECT * FROM profiles WHERE profiles.name LIKE :req AND profiles.user_id <> :loggedUserId";
        client.query(friendsQuery, {loggedUserId: req.user.id}, function(err, friends) {
            if(err) return res.status(500).send({message: "Error en la petición cuando buscamos amigos, " + err});
            console.log(JSON.stringify(friends));
            client.query(usersQuery, {req: req.query.search, loggedUserId: req.user.id}, function(err, users) {
                if(err) return res.status(500).send({message: "Error en la petición cuando buscamos usuarios, " + err});
                console.log(JSON.stringify(users));
                res.render("user/search", {users: users, friends: friends, search: req.query.search});
            });
        });
    }

    client.end();
});

router.get('/:id', function(req, res, next) {
    console.log('Profile con id', req.params);
    var client = require('../db/db');

    var profile = {};
    client.query('SELECT * FROM profiles WHERE user_id=:user_id', {user_id: req.params.id}, function(err, profileResult) {
        if (err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        profile = profileResult[0];
    });

    var friendRequests = {};
    // Parte de peticiones de amistad
    client.query("SELECT DISTINCT friends.*, profiles.email, profiles.user_id  FROM friends INNER JOIN profiles ON friends.sender=profiles.user_id WHERE friends.receiver=:loggedUserId AND friend_request=0;",
        {loggedUserId: req.user.id}, function(err, friendRequestsRows){
        console.log('LoggedUserId', req.user.id);
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        console.log(friendRequests);
        friendRequests = friendRequestsRows;
    });


    var posts = {};
    client.query("SELECT DISTINCT posts.user_id, name, content, `date`, profiles.image_profile\n" +
        "FROM posts\n" +
        "INNER JOIN friends ON (posts.user_id=friends.sender OR posts.user_id=friends.receiver)\n" +
        "INNER JOIN profiles ON posts.user_id=profiles.user_id\n" +
        "WHERE friends.friend_request=1 AND (friends.sender=:user OR friends.receiver=:user)\n" +
        "ORDER BY `date` DESC;",
        {user: req.params.id},
        function (err, postsRows) {
            if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            console.log(postsRows);
            posts = postsRows;
        });
    // Parte de amigos
    client.query("SELECT * FROM profiles WHERE user_id IN " +
        "(SELECT sender FROM friends WHERE receiver=:user AND friend_request=1 UNION ALL SELECT receiver FROM friends WHERE sender=:user AND friend_request=1)",
        {user: req.params.id}, function(err, friends) {
            if(err) console.log(err);
            else res.render("user/profile", {posts: posts, profile: profile, friendRequests: friendRequests, friends: friends});
        });

    client.end();
});

router.post('/:id/edit', function (req, res, next) {
    var dbConn=require("../db/db");
    dbConn.query("UPDATE profiles SET name=:name, surname=:surname where user_id=:loggedUserId", {name: req.body.name, surname: req.body.surname, loggedUserId: req.user.id}, function(err, userUpdated){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        else if(userUpdated){
            dbConn.query("UPDATE users SET email=:email WHERE id=:loggedUserId", {email: req.body.email, loggedUserId: req.user.id}, function(err, updatedEmail){
                if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
                console.log(JSON.stringify(updatedEmail));
                return res.status(200).send({status: "success"});
            });
        }
    });
    dbConn.end();
});

module.exports = router;
