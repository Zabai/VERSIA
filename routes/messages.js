var express = require("express");
var router = express.Router();

router.post("/send", function(req, res, next){
    var messageData = {
        from: req.body.from,
        to: req.body.to,
        content: req.body.content
    };
    var dbConn = require("../db/db");
    dbConn.query("INSERT INTO messages(sender, receiver, content) VALUES(:from, :to, :content)", {from: messageData.from, to: messageData.to, content: messageData.content},
        function(err, messageSent){
            if(err) {
                console.log(err);
                return res.status(500).send({message: "Ha habido un error en la db: " + err});
            }
            return res.status(200).send();
        });
    dbConn.end();
});

module.exports = router;