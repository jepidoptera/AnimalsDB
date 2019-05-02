// jshint esversion: 6
var animals = require("../models/animals");

var express = require("express");

var router = express.Router();

var path = require("path");

// =======================================
// routes

// display all animals
router.get("/", function(req, res) {
    console.log("get index");
    animals.all(function(data) {
        var colors = [
            "rgb(0,96,0)",
            "rgb(96,128,0)",
            "rgb(128,128,0)",
            "rgb(192,128,0)",
            "rgb(255,92,0)",
            "rgb(192,0,0)",
            "rgb(0,0,0)"
        ];
        data.forEach(animal => {
            if (animal.conservation_status == "extinct") {
                // mark it so handlebars will render a "de-extinctify" button
                animal.extinct = true;
            }
            animal.color = colors[animals.conservation_status.indexOf(animal.conservation_status)];
        });
        // console.log(data);
        res.render("index", {animals: data});
    });
});

router.get("/api/new", function(req, res) {
    res.render("edit", {
        species_name: "unicorn",
        description: "a magical new creation",
        id: -1,
        conservation_status: "extinct",
        options: animals.conservation_status.map(option => {return {tag: option};});
    });
});

router.get("/edit/:animalID", function(req, res) {
    var animalID = req.params.animalID;
    animals.get(animalID, function(data) {
        var animal = data[0];
        // set dropdown options as an array of objects for handlebars
        animal.options = animals.conservation_status.map(option => {return {tag: option};});
        console.log('edit request: ' + animal.species_name);
        res.render("edit", animal);
    });
});

router.post("/api/conserve/:animalID", function(req, res) {
    animals.conserve(req.params.animalID, function(data) {
        console.log(data);
        res.status(200).end();
    });
});

router.post("/api/exploit/:animalID", function(req, res) {
    animals.exploit(req.params.animalID, function(data) {
        console.log(data);
        res.status(200).end();
    });
});

router.post("/api/update/:animalID", function(req, res) {
    var animalID = req.params.animalID;
    if (animalID >= 0) {
        // update animal
        animals.update(req.body, "id=" + animalID, function () {
            res.redirect("/");
        });
    }
    else {
        // new animal
        // get cols and vals from req.body
        var cols = Object.keys(req.body);
        var vals = cols.map((col) => {return req.body[col];});
        // call "create"
        animals.create(cols, vals, function () {
            // send back to the home page
            res.redirect("/");
        });
    }
});

module.exports = router;

// =======================================
// stuff besides routes

