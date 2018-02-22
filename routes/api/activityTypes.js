var express = require('express');
var router = express.Router();
var config = require('../../config');

var mongoose = require('mongoose');
var db = mongoose.connection;

var ActivityType = require('../../models/activityType');

/* add seed data to db */
ActivityType.collection.count({}, (err, res) => {
    if (err) console.log(err);
    if (res == 0) {
        var activityTypeSeedData = require('../../data/activityTypeSeed').activityTypes;

        console.log('Adding activity types seed data...');
        ActivityType.insertMany(activityTypeSeedData);
    }
})

/* routes */
router.get('/', (req, res) => {

});

module.exports = router;