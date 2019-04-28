var orm = require("../config/orm.js");

// possible conservation statuses
var conservation_status = [
    "least concern",
    "near threatened",
    "threatened",
    "endangered",
    "critically endangered",
    "extinct in the wild",
    "extinct"
];

function getConservationStatus (str) {
    return conservation_status.indexOf(str);
}

// animals model
// species_name, description, conservation_status, createdAt, updatedAt
var animals = {
    all: function(cb) {
        orm.all("animals", function(res) {
        cb(res);
        });
    },
    // The variables cols and vals are arrays.
    create: function(cols, vals, cb) {
        orm.create("cats", cols, vals, cb);
    },
    conserve: function(animal, cb) {
        // improve this creature's conservation status
    },
    update: function(objColVals, condition, cb) {
        orm.update("cats", objColVals, condition, function(res) {
        cb(res);
        });
    },
    delete: function(id, cb) {
        orm.delete("cats", "id="+id, cb);
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = animals;
