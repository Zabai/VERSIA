var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('post/test');
});

router.post('/new', function (req, res, next) {
    var client = require('../db/db');
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(JSON.stringify(req.body));

    client.query("INSERT INTO posts (user_id, content, date) VALUES (:user_id, :content, :date)",
        {user_id:req.user.id, content:req.body.content, date: date},
        function(err, post) {
            if (err) {
                console.log(err);
                return res.status(500).send({message: "Error al crear post: " + err});
            }
            return res.status(200).send();
        });
    client.end();
    res.redirect(req.get('referer'));
});

router.delete('/remove', function (req, res, next) {
    var client = require('../db/db');

    client.query("DELETE FROM posts WHERE (id =:postId)", {postId: req.body.postId},
        function(err, post) {
            if (err) {
                console.log(err);
                return res.status(500).send({message: "Error al borrar post: " + err});
            }
            return res.status(200).send();
        });
    client.end();
});

module.exports = router;