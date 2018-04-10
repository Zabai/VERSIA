var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var loggedUserEmail = req.user.email;
    var friendsReq;
    var dbConn = require('../db/db');

    dbConn.query("SELECT DISTINCT * FROM Friends WHERE receiver=:loggedUserEmail AND friend_request=0", {loggedUserEmail: loggedUserEmail}, function(err, friendRequests){
        if(err) return res.status(500).send({message: "Ha habido un error en la db: " + err});
        console.log(JSON.stringify(friendRequests));
        res.render("user/profile", {friendRequests: friendRequests});
    });
    dbConn.end();
});

module.exports = router;
