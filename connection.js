const mysql = require('mysql2');

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'h@Rsha01',
    database:'employeedb'
});

mysqlConnection.connect((err) => {
    if (err) {
        console.log('ERROR in DB Connection:' + JSON.stringify(err, undefined, 2));
    } else {
        console.log('DB connected successfully');
    }
});

module.exports = mysqlConnection;
