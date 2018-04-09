var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/add', function (req, res, next) {
    var email = req.query["email"];
    var dbConn = require('../db/db');

    dbConn.query("INSERT INTO Friends(sender, receiver) VALUES(:sender, :receiver)", {sender: "correo1@ulpgc.es", receiver: email}, function(err, friendPetition){
        if(err)return res.status(500).send({message: "Ha habido un error en la db: " + err});

    });
});
module.exports = router;