var express = require('express');
var router = express.Router();

// INDEX
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// CREATE
router.post('/', function(req, res, next) {
    res.redirect('/');
});

// UPDATE
router.put('/:id', function(req, res, next) {
    res.redirect('/');
});

// DELETE
router.delete('/:id', function(req, res, next) {
    res.redirect('/');
});

module.exports = router;