var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;

var ActivityType = require('../../models/activityType');


/* add seed data to db */
// first remove existing data
ActivityType.collection.drop();

// add seed data
var activityTypeSeedData = require('../../data/activityTypeSeed').activityTypes;
ActivityType.insertMany(activityTypeSeedData);

/* routes */
router.get('/', (req, res) => {
    res.send('hi from activityTypes!');
});

module.exports = router;