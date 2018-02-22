var express = require('express');
var router = express.Router();

var Event = require('../../models/event');
var ActivityType = require('../../models/activityType');

/* add seed data to db */
Event.collection.count({}, (err, res) => {
    if (err) console.log(err);
    if (res == 0) {
        var eventSeedData = require('../../data/eventSeed').events;

        console.log('Adding events seed data...');
        Event.insertMany(eventSeedData);
    }
})

/* routes */

// get all events
router.get('/', (req, res) => {
    Event.find({}, (err, data) => {
        if (err) {
            res.status(400);
            res.send(err);
        }
        res.json(data);
    })
});

// get event by id
router.get('/:id', (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.status(400);
            res.send(err);
        }
        res.json(event);
    })
});

// add event
router.post('/', (req, res) => {
    var newEvent = new Event();

    if (!req.body.from ||
        !req.body.to ||
        !req.body.activityTypeId ||
        !req.body.isActive) {
        res.status(400);
        res.json({
            "error": "Bad data, could not add to database."
        })
    } else {
        ActivityType.findById(req.body.activityTypeId, (err, activityType) => {
            if (err) {
                res.send(err);
            } else if (!activityType) {
                res.status(400);
                res.send({
                    "message": "Bad data, could not add to database."
                });
            } else {
                newEvent.eventDateTimes.from = req.body.from;
                newEvent.eventDateTimes.to = req.body.to;
                newEvent.activityType = activityType;
                newEvent.isActive = req.body.isActive;

                // finally, save to db
                newEvent.save((err, data, numAffected) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(data);

                        console.log(`Added new event: ${newEvent.activityType.desc} from ${newEvent.eventDateTimes.from} to ${newEvent.eventDateTimes.to}`);
                    }
                })
            }
        })
    }
});

// update event
router.put('/:id', (req, res) => {
    if (!req.body.from ||
        !req.body.to ||
        !req.body.activityTypeId ||
        !req.body.isActive) {
        res.status(400);
        res.json({
            "error": "Bad data, could not update."
        })
    } else {
        Event.findById(req.params.id, (err1, event) => {
            if (err1) {
                res.status(400);
                res.send(err1);
            } else if (!event) {
                res.status(400);
                res.json({
                    "message": "Bad data, could not update."
                });
                console.log("hi");
            } else {
                ActivityType.findById(req.body.activityTypeId, (err2, activityType) => {
                    if (err2) {
                        res.status(400);
                        res.send(err2);
                    } else if (!activityType) {
                        res.status(400);
                        res.json({
                            "message": "Bad data, could not update."
                        });
                    } else {
                        event.eventDateTimes.from = req.body.from;
                        event.eventDateTimes.to = req.body.to;
                        event.activityType = activityType;
                        event.isActive = req.body.isActive;

                        // finally, save to db
                        event.save((err3, data, numAffected) => {
                            if (err3) {
                                res.send(err);
                            } else {
                                res.json(data);

                                console.log(`Updated event: ${event.activityType.desc} from ${event.eventDateTimes.from} to ${event.eventDateTimes.to}`);
                            }
                        })
                    }
                });
            }
        })
    }
});

// delete event
router.delete('/:id', (req, res) => {
    Event.remove({
        _id: req.params.id
    }, (err, event) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.json({
                "message": "Successfully deleted event."
            });

            console.log(`Deleted event: ${event.activityType.desc} from ${event.eventDateTimes.from} to ${event.eventDateTimes.to}`)
        }
    })
})

module.exports = router;