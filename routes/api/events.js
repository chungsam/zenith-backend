var express = require('express');
var router = express.Router();

var Event = require('../../models/event');

/* add seed data to db */
// first remove existing data
Event.collection.count({}, (err, res) => {
    if (err) console.log(err);
    if (res == 0) {
        var eventSeedData = require('../../data/eventSeed').events;
        
        console.log('Adding events seed data...');
        Event.insertMany(eventSeedData);
    }
})

/* routes */
router.get('/', (req, res) => {
    res.send('hi from events!');
});

module.exports = router;