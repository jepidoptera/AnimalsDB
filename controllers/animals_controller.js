var animals = require("../models/animal");

var express = require("express");

var router = express.Router();

// display all animals
router.get("/", function(req, res) {
    animals.all(function(data) {
        console.log(data);
        res.render("index", {animals: data});
    });
});

module.exports = router;