var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/search', function(req, res, next) {
    res.render('search',
        {users: [
                {
                    name: "Carlos Martel Lamas",
                    degree: "Computer Science",
                    university: "ULPGC"
                },
                {
                    name: "Zabai el BuscaLolis",
                    degree: "Loli Stalking",
                    university: "UCM"
                },
                {
                    name: "Geraldo The Black One",
                    degree: "Police Escapism",
                    university: "Jail"
                }
        ]});
});

module.exports = router;