var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.user);
});

router.post('/add', function(req, res, next) {
    console.log('SenderId: ', req.user.id);
    console.log('ReceiverId: ', req.body);
    var client = require('../db/db');
    client.query("INSERT INTO friends(sender, receiver, friend_request) VALUES(:sender, :receiver, 0)",
        {sender: req.user.id, receiver: req.body.id},
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
    var receiverId = req.user.id;
    var senderEmail = req.body.email;
    var client = require('../db/db');
    client.query('UPDATE friends INNER JOIN profiles ON profiles.user_id = friends.sender SET friend_request = 1 WHERE profiles.email="felix@ulpgc.es" AND receiver=:receiverId;',
        {senderEmail: senderEmail, receiverId: receiverId},
        function(err, friendPetition) {
            if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            return res.status(200).send();
        });

    client.end();
});

router.delete('/decline', function(req, res, next) {
    var receiverId = req.user.id; // Cambiar por el id o no
    var senderId = req.body.id;
    var client = require('../db/db');
    client.query('DELETE FROM friends WHERE sender = :senderId AND receiver = :receiverId;',
        {senderId: senderId, receiverId: receiverId},
        function(err, friendPetition) {
            if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
            return res.status(200).send();
        });

    client.end();
});

router.put('/undo', function (req, res, next){
    var client = require('../db/db');
    client.query("DELETE FROM friends WHERE sender = :senderId AND receiver = :receiverId", {senderId: req.user.id, receiverId: req.body.id},
        function(err, friendPetition){
            if (err) return res.status(500).send({message: "Ha habido un error en la db deshaciendo la petición: " + err});
            return res.status(200).send();
        });
    client.end();
});

router.delete('/remove', function(req, res, next){
    var dbConn = require('../db/db');
    dbConn.query("DELETE FROM friends WHERE ((sender =:self AND receiver =:user) OR (sender =:user AND receiver =:self))", {user: req.body.friendEmail, self: req.body.myEmail},
        function(err, rows){
            console.log(JSON.stringify(rows));
            if(err)return res.status(500).send({message: "Ha habido un error en la db eliminando el amigo que en realidad no tienes. Asocial." + err});
            return res.status(200).send();
        });
    dbConn.end();
});
module.exports = router;