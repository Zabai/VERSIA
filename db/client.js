var mysql = require('mysql');
var connection = new mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'sprint0'
});
connection.connect();

module.exports = connection;