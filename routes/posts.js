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

router.post('/reply', function (req, res, next) {
    var client = require('../db/db');
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var data = {user_id:req.user.id, content:req.body.content, date:date, parent_id:req.body.id};
    client.query("INSERT INTO posts (user_id, content, date, parent_id) VALUES" +
                "(:user_id, :content, :date, :parent_id)",
                {user_id: req.user.id, content: req.body.content, date: date, parent_id: req.body.id},
                function (err, post) {
                    console.log("DATOS DE LA RESPUESTA: ", data);
                    if (err) {
                        console.log(err);
                        return res.status(500).send({message: "Error al responder al post: " + err});
                    }
                    return res.status(200).send();
                });
});
module.exports = router;