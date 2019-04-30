var animals = require("../models/animals");

var express = require("express");

var router = express.Router();

// =======================================
// routes

// display all animals
router.get("/", function(req, res) {
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

module.exports = router;

// =======================================
// stuff besides routes

