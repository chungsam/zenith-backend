var express = require('express');
var router = express.Router();
var moment = require('moment');
var ActivityType = require('../models/activityType');

/* GET activity types listing. */
router.get('/', function (req, res, next) {
    var responsePayload = {
        title: "Activity Types Listing",
        moment: moment
    }

    var activityTypes = [];
    ActivityType.find({}, (err, data) => {
        if (err) {
            res.status(400);
            res.json({
                "message": "Response error, no activities retrieved."
            });
        } else {
            responsePayload.activityTypes = data;
        }

        res.render('activities/index', responsePayload);
    }).sort('-creationDate');
});

router.get('/edit/:id', (req, res) => {
    var responsePayload = {
        title: "Edit Activity Type",
    };

    ActivityType.find({
        _id: req.params.id
    }, (err, data) => {
        if (err) {
            res.status(400);
            res.json({
                "message": "Response error, activity type doesn't exist."
            })
        } else {
            var activityType = data[0];
            responsePayload.activityType = activityType;
        }

        res.render('activities/edit', responsePayload);
    })
});

router.get('/add', (req, res) => {
    var responsePayload = {
        title: "Add Activity Type",
    };

    res.render('activities/add', responsePayload);
});

module.exports = router;