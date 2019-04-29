var animals = require("../models/animals");

var express = require("express");

var router = express.Router();

// =======================================
// routes

// display all animals
router.get("/", function(req, res) {
    animals.all(function(data) {
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

