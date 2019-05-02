// jshint esversion: 6

var connection = require("./connection");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    Object.keys(ob).forEach((key) => {
        var value = ob[key];
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string") {
            // add quotes at each end, and escape any apostrophes while we're at it
            value = "'" + value.replace(/'/gi, "\\'") + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
    });
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
  // Object for all our SQL statement functions.
  var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      orm.query(queryString, cb);
    },
    
    get: function(tableInput, id, cb) {
        var queryString = "SELECT * FROM " + tableInput + " WHERE id=" + id;
        orm.query(queryString, cb);
    },

    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += "'"+ vals.join("','") + "'";
      queryString += ") ";
  
      orm.query(queryString, cb);
    },

    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      orm.query(queryString, cb);
    },

    value: function(table, columns, condition, cb) {
        var queryString = "SELECT " 
            + columns.join(", ") 
            + " FROM " + table
            + " WHERE "
            + condition;

        orm.query(queryString, cb);
    },

    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
    
        orm.query(queryString, cb);
    },

    query: function (queryString, callback) {
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
        
            callback(result);
        });
    }
};
  
  // Export the orm object for the model (cat.js).
  module.exports = orm;
  