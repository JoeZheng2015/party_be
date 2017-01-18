'use strict'

const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

function query(callback) {
    connection.connect();

    const sql = `select * from person`
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result)
        callback(result)
    });


    connection.end();
}

const operation = {
    query
}

module.exports = operation
