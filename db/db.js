var Client = require("mariasql");

module.exports = new Client({
    host:       'localhost',
    user:       'versia',
    password:   'versia',
    db:         'sprint2',
    charset:    'utf8'
});