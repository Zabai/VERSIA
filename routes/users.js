var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var loggedUserEmail = req.user.email;
    var friendsReq;

    var client = require('../db/db');
    client.query("SELECT DISTINCT * FROM friends WHERE receiver=:loggedUserEmail AND friend_request=0", {loggedUserEmail: loggedUserEmail}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        console.log(JSON.stringify(friendRequests));
        res.render("user/profile", {friendRequests: friendRequests});
    });
    client.end();
});

router.get('/:id', function(req, res, next) {
    var loggedUserEmail = req.user.email;

    var client = require('../db/db');
    var user = {};
    client.query('SELECT * FROM profile WHERE email=:email', {email: loggedUserEmail}, function(err, profile) {
        if (err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        user = profile[0];
    });

    client.query("SELECT DISTINCT * FROM friends WHERE receiver=:loggedUserEmail AND friend_request=0", {loggedUserEmail: loggedUserEmail}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        console.log(JSON.stringify(friendRequests));
        res.render("user/profile", {user: user, friendRequests: friendRequests});
    });

    client.end();
});



module.exports = router;
