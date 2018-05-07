var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.user);
});

router.post('/add', function(req, res, next) {
    var email = req.body.email;

    var client = require('../db/db');
    client.query("INSERT INTO friends(sender, receiver, friend_request) VALUES(:sender, :receiver, 0)",
        {sender: req.user.email, receiver: email},
        function(err, friendPetition) {
            if(err) {
                console.log(err);
                return res.status(500).send({message: "Ha habido un error en la db: " + err});
            }
            return res.status(200).send();
        });

    client.end()
});

router.put('/accept', function(req, res, next) {
    var receiverId = req.user.email; // Cambiar por el id o no
    var senderId = req.body.email;

    var client = require('../db/db');
    client.query('UPDATE friends SET friend_request = 1 WHERE sender = :senderId AND receiver = :receiverId',
        {senderId: senderId, receiverId: receiverId},
        function(err, friendPetition) {
            if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            return res.status(200).send();
        });

    client.end();
});

router.delete('/decline', function(req, res, next) {
    var receiverId = req.user.email; // Cambiar por el id o no
    var senderId = req.body.email;

    var client = require('../db/db');
    client.query('DELETE FROM friends WHERE sender = :senderId AND receiver = :receiverId',
        {senderId: senderId, receiverId: receiverId},
        function(err, friendPetition) {
            if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            return res.status(200).send();
        });

    client.end();
});

router.put('/undo', function (req, res, next){
    var dbConn = require('../db/db');
    dbConn.query("DELETE FROM friends WHERE sender = :self AND receiver = :user", {self: req.user.email, user: req.body.email},
        function(err, friendPetition){
            if (err) return res.status(500).send({message: "Ha habido un error en la db deshaciendo la petición: " + err});
            return res.status(200).send();
        });
    dbConn.end();
});
module.exports = router;