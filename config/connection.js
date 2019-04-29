var mysql = require("mysql");
// database hosted by Heroku
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: "dyud5fa2qycz1o3v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "vzw5x4k95eq3qwdn",
        password: "p1swt27mcolzdf3b",
        database: "il335ahbyonm55be"
    });
}

module.exports = connection;