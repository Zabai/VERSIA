var Client = require("mariasql");

module.exports = new Client({
    host:       'localhost',
    user:       'versia',
    password:   'versia',
    db:         'sprint1',
    charset:    'utf8'
});