var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.user);
});

router.post('/add', function (req, res, next) {
    var email = req.body.email;

    var client = require('../db/db');
    client.query("INSERT INTO friend(sender, receiver, friend_request) VALUES(:sender, :receiver, 0)", {sender: req.user.email, receiver: email}, function(err, friendPetition){
        if(err){
            console.log(err);
            return res.status(500).send({message: "Ha habido un error en la db: " + err});
        }
        return res.status(200).send({message: "Amigo agregado."});
    });

    client.end()
});

router.put('/accept',function(req, res, next) {
    var recieverId = req.user.email; // Cambiar por el id o no
    var senderId= req.query.email;

    var client = require('../db/db');
    client.query('UPDATE friend SET friend_request = 1 WHERE sender = :senderId AND reciever = :recieverId',
        {senderId: senderId, recieverId: recieverId},
        function (err, friendPetition) {
            if (err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            return res.status(200).send();
    });

    client.end();
});

router.put('/decline',function(req, res, next) {
    var recieverId = req.user.email; // Cambiar por el id o no
    var senderId= req.query.email;

    var client = require('../db/db');
    client.query('DELETE FROM friend WHERE sender = :senderId AND reciever = :recieverId',
        {senderId: senderId, recieverId: recieverId},
        function (err, friendPetition) {
            if (err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            return res.status(200).send();
        });

    client.end();
});

router.put('/undo', function (req, res, next){
    var dbConn = require('../db/db');
    dbConn.query("DELETE FROM friend WHERE sender = :self AND receiver = :user", {self: req.user.email, user: req.body.email},
        function(err, friendPetition){
            if (err) return res.status(500).send({message: "Ha habido un error en la db deshaciendo la petición: " + err});
            return res.status(200).send();
        });
    dbConn.end();
});
module.exports = router;