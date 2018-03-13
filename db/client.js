var Client = require('mariasql');

module.exports = new Client({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    db       : 'sprint0',
    charset  : 'utf8'
});