var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var ActivityType = require('../models/activityType');
var moment = require('moment');

/* GET event listing. */
router.get('/', function (req, res, next) {
    var responsePayload = {
        title: "Events Listing",
        moment: moment
    }

    var events = [];
    Event.find({}, (err, data) => {
        if (err) {
            res.status(400);
            res.json({
                "message": "Response error, no activities retrieved."
            });
        } else {
            responsePayload.events = data;
        }

        res.render('events/index', responsePayload);
    }).sort('-creationDate');
});

router.get('/edit/:id', (req, res) => {
    var responsePayload = {
        title: "Edit Activity Type",
        moment: moment
    };

    Event.find({
        _id: req.params.id
    }, (err, data) => {
        if (err) {
            res.status(400);
            res.json({
                "message": "Response error, activity type doesn't exist."
            })
        } else {
            var event = data[0];
            responsePayload.event = event;
            
            ActivityType.find({}, (err, data) => {
                if(err) {
                    res.status(400);
                    res.json(err);
                } else {
                    responsePayload.activityTypes = data;
                }

                res.render('events/edit', responsePayload);
            })
            
        }

        
    })
});

router.get('/add', (req, res) => {
    var responsePayload = {
        title: "Add Event",
    };

    ActivityType.find({}, (err, data) => {
        if(err) {
            res.status(500);
            res.json(err);
        } else {
            responsePayload.activityTypes = data;
        }

        res.render('events/add', responsePayload);
    }).sort('desc');

    
});

module.exports = router;