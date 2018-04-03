var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

router.get("/", function (req, res, next) {
    res.render("home/index")
});

router.get('/search', function(req, res, next) {
    db.query("SELECT name, surname, university, degree FROM Profile WHERE name LIKE :req", {req: req.query.search}, function(err, users){
        if(err)return res.status(500).send({message:"Error en la petición"});
        if(users){
            res.render('home/search', {users: users, somethingWeLookFor: req.query.search});
        }
    });
});

module.exports = router;