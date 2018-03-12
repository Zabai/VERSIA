var express = require('express');
var router = express.Router();

// INDEX
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// CREATE
router.post('/', function(req, res, next) {
    var client = require('../db/client');

    client.query("INSERT INTO todo(job) VALUES (?)", [req.body.job], function(error, results, fields) {
        if(error)console.log("Error en el insert: " + error);
        console.log("Resultado: " + JSON.stringify(results));
        console.log("Fields: " + fields);
    });

    res.redirect('/');
});

// UPDATE
router.put('/:id', function(req, res, next) {
    var client = require('../db/client');

    client.query("UPDATE todo SET job = ? where id = ?", [req.body.job, req.params.id], function(error, results, fields) {
        if(error)console.log("Error en el update: " + error);
        console.log("Resultado: " + JSON.stringify(results));
        console.log("Fields: " + fields);
    });

    res.redirect('/');
});

// DELETE
router.delete('/:id', function(req, res, next) {
    var client = require('../db/client');

    client.query("DELETE FROM todo WHERE id = ?", [req.params.id], function(error, results, fields) {
        if(error)console.log("Error en el delete: " + error);
        console.log("Resultado: " + JSON.stringify(results));
        console.log("Fields: " + fields);
    });

    res.redirect('/');
});

module.exports = router;