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
    var client = require('../db/db');
    client.query("SELECT email, name, surname, university, degree FROM profile WHERE name LIKE :req", {req: req.query.search}, function(err, users){
        if(err) return res.status(500).send({message:"Error en la petición, " + err});
        res.render('user/search', {users: users, search: req.query.search});
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

    client.query("SELECT DISTINCT * FROM friends WHERE receiver=:loggedUserEmail AND friend_request=0", {loggedUserEmail: req.params.id}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        res.render("user/profile", {profile: profile, friendRequests: friendRequests});
    });

    client.end();
});

router.put('/edit', function (req, res, next) {
    /*var client = require('../db/db');
    client.query("UPDATE profile SET  name=name WHERE email=:email",{email: email}, function (err) {
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
    });
    client.end();*/
});
module.exports = router;
