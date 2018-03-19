var express = require('express');
var router = express.Router();

// INDEX
router.get('/', function(req, res, next) {
    var client = require('../db/client');
    var doneTable;
    var undoneTable;

    client.query("SELECT * FROM todo WHERE done = 1", function(error, results){
        if(error)
            console.log("Problemas a la hora de traernos las cosas de la tabla, kvron.");
        else
            console.log("Resultados: ", results);
        doneTable = results;
    });
    client.query("SELECT * FROM todo WHERE done = 0", function(error, results){
        if(error)
            console.log("Problemas a la hora de traernos las cosas de la tabla, kvron.");
        else
            console.log("Resultados: ", results);
        undoneTable = results;
        res.render('index', { title: 'Express', doneTable: doneTable, undoneTable: undoneTable });
    });
    client.end();
});

// CREATE
router.post('/', function(req, res, next) {
    var client = require('../db/client');
    client.query("INSERT INTO todo(job) VALUES (:job)", {job: req.body.job}, function(error, results) {
        if(error)
            console.log("Error en el insert: " + error);
        else
            console.log("Resultado: " + JSON.stringify(results));
        res.redirect('/');
    });
    client.end();
});

// READ
router.get('/:id', function(req, res, next) {
    var client = require('../db/client');
    client.query("SELECT job_id = :job_id FROM todo;", {job_id: req.params.id}, function(error, results) {
        if (error)
            console.log("Error en la lectura de la bd: " + error);
        else
            console.log("Resultado: " + JSON.stringify(results));
        res.redirect('/');
    });
    client.end();
});

// UPDATE
router.put('/:id', function(req, res, next) {
    var client = require('../db/client');

    client.query("UPDATE todo SET job = :job, done = :done WHERE id = :job_id", {job: req.body.job, job_id: req.params.id, done:req.body.done}, function(error, results) {
        if(error)
            console.log("Error en el update: " + error);
        else
            console.log("Resultado: " + JSON.stringify(results));
        res.redirect('/');
    });
    client.end();
});

// DELETE
router.delete('/:id', function(req, res, next) {
    var client = require('../db/client');

    client.query("DELETE FROM todo WHERE id = :job_id", {job_id: req.params.id}, function(error, results) {
        if(error)
            console.log("Error en el delete: " + error);
        else
            console.log("Resultado: " + JSON.stringify(results));
        res.redirect('/');
    });
    client.end();
});

module.exports = router;