var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.user);

});

router.post('/add', function (req, res, next) {
    var email = req.body.email;
    var dbConn = require('../db/db');
    dbConn.query("INSERT INTO Friends(sender, receiver) VALUES(:sender, :receiver)", {sender: "correo1@ulpgc.es", receiver: email}, function(err, friendPetition){
        if(err){
            console.log(err);
            return res.status(500).send({message: "Ha habido un error en la db: " + err});
        }
        console.log(JSON.stringify(friendPetition));
        return res.status(200).send(friendPetition);
    });
    dbConn.end()
});
module.exports = router;