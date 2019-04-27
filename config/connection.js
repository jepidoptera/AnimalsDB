var mysql = require("mysql");
var connection = 
    process.env.JAWSDB_URL || 
    mysql.createConnection({
        host: "localhost",
        port: 8889,
        user: "root",
        password: "root",
        database: "animalsDB"
    });