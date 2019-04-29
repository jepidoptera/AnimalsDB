var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Import routes and give the server access to them.
var routes = require("./controllers/animals_controller");
app.use(routes);

app.listen(process.env.PORT || 3030, function () {
    console.log("Listening on port " + (process.env.PORT || 3030));
});