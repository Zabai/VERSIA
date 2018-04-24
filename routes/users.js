var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var loggedUserEmail = req.user.email;

    var client = require('../db/db');
    client.query("SELECT DISTINCT * FROM friends WHERE receiver=:loggedUserEmail AND friend_request=0", {loggedUserEmail: loggedUserEmail}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        console.log(JSON.stringify(friendRequests));
        res.render("user/profile", {friendRequests: friendRequests});
    });
    client.end();
});


router.get('/search', function(req, res, next) {
    //{req: req.query.search, loggedUserEmail: req.user.email}
    var client = require('../db/db');
    var friendsQuery = "SELECT receiver, friend_request from friends where sender = :loggedUserEmail AND (friend_request=0 OR friend_request=1)";
    var usersQuery = "SELECT email, name, surname, university, degree FROM profile WHERE profile.name LIKE :req AND profile.email <> :loggedUserEmail";
    client.query(friendsQuery, {loggedUserEmail: req.user.email}, function(err, friends){
        if(err) return res.status(500).send({message:"Error en la petición cuando buscamos amigos, " + err});
        console.log(JSON.stringify(friends));
        client.query(usersQuery, {req: req.query.search, loggedUserEmail: req.user.email}, function(err, users){
            if(err) return res.status(500).send({message:"Error en la petición cuando buscamos usuarios, " + err});
            console.log(JSON.stringify(users));
            res.render("user/search", {users:users, friends:friends, search: req.query.search});
        });
    });
    client.end();
});

router.get('/:id', function(req, res, next) {
    var client = require('../db/db');
    var profile = {};
    client.query('SELECT * FROM profile WHERE email=:email', {email: req.params.id}, function(err, profileResult) {
        if (err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        profile = profileResult[0];
    });

    //values for the friend_list
    client.query("SELECT DISTINCT * FROM friends WHERE receiver=:loggedUserEmail AND friend_request=0", {loggedUserEmail: req.params.id}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        res.render("user/profile", {profile: profile, friendRequests: friendRequests});
    });

    client.end();
});

router.post('/:id/edit', function (req, res, next) {
    var dbConn=require("../db/db");
    dbConn.query("UPDATE profile SET name=:name, surname=:surname where email=:loggedEmail", {name: req.body.name, surname: req.body.surname, loggedEmail: req.user.email}, function(err, userUpdated){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        else if(userUpdated){
            dbConn.query("UPDATE user SET email=:email WHERE email=:loggedEmail", {email: req.body.email, loggedEmail: req.user.email}, function(err, updatedEmail){
                if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
                console.log(JSON.stringify(updatedEmail));
                return res.status(200).send({status:"success"});
            });
        }
    });
    dbConn.end();
});

module.exports = router;
