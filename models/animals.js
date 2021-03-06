var orm = require("../config/orm.js");

// animals model

function getConservationStatus (animalID, callback) {
    orm.value("animals", ["conservation_status"], "id=" + animalID, function(data) {
        callback(animals.conservation_status.indexOf(data[0].conservation_status));
    });
}

// species_name, description, conservation_status, createdAt, updatedAt
var animals = {
    // possible conservation statuses
    conservation_status: [
        "least concern",
        "near threatened",
        "threatened",
        "endangered",
        "critically endangered",
        "extinct in the wild",
        "extinct"
    ],

    all: function(cb) {
        orm.all("animals", function(res) {
        cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("animals", cols, vals, cb);
    },
    get: function(animalID, cb) {
        orm.get("animals", animalID, cb);
    },
    conserve: function(animalID, cb) {
        // check current conservation status
        getConservationStatus(animalID, function(statusLevel) {
            // if possible, decrease the animal's status
            var prevStatus = statusLevel;
            if (statusLevel > 0)
                orm.update("animals", {conservation_status: animals.conservation_status[-- statusLevel]}, "id=" + animalID, cb);

            // log change
            console.log("status: " + animals.conservation_status[prevStatus] + " --> " + animals.conservation_status[statusLevel]);
        });
    },
    exploit: function(animalID, cb) {
        // check current conservation status
        getConservationStatus(animalID, function(statusLevel) {
            // increase the animal's status towards extinction
            var prevStatus = statusLevel;
            if (statusLevel < animals.conservation_status.length - 1)
                orm.update("animals", {conservation_status: animals.conservation_status[++ statusLevel]}, "id=" + animalID, cb);

            // log change
            console.log("status: " + animals.conservation_status[prevStatus] + " --> " + animals.conservation_status[statusLevel]);
        });
    },
    update: function(objColVals, condition, cb) {
        orm.update("animals", objColVals, condition, function(res) {
        cb(res);
        });
    },
    delete: function(id, cb) {
        orm.delete("animals", "id="+id, cb);
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = animals;
