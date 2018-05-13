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

router.post('/:id/edit', function (req, res, next){
    var dbConn = require('../db/db');
    var postId = req.params.id;
    console.log(postId +"-"+req.body.content);
    dbConn.query("UPDATE posts SET content=:content WHERE id=:post_id", {content:req.body.content, post_id: postId}, function(err, update){
        if(err)
            return res.status(500).send({message: "Error al editar post: " + err});
        console.log(JSON.stringify(update));
        return res.status(200).send();
    });
    dbConn.end();
});
module.exports = router;