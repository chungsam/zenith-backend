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
    console.log(req.body);
    var newEvent = new Event();

    if (!req.body.eventDate ||
        !req.body.eventFrom ||
        !req.body.eventTo ||
        !req.body.activityTypeId) {
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
                // convert to Date object and parse it for other fields
                var eventFullDate = new Date(req.body.eventDate);
                var eventYear = eventFullDate.getYear();
                var eventMonth = eventFullDate.getMonth();
                var eventDay = eventFullDate.getDay();

                newEvent.eventDateTimes.date = eventFullDate;

                // parse event from/to times
                var fromParsed = req.body.eventFrom.split(':');
                var fromHour = fromParsed[0];
                var fromMinutes = fromParsed[1];

                newEvent.eventDateTimes.from = new Date(
                    eventYear, eventMonth, eventDay, fromHour, fromMinutes
                );

                var toParsed = req.body.eventTo.split(':');
                var toHour = toParsed[0];
                var toMinutes = toParsed[1];

                newEvent.eventDateTimes.to = new Date(
                    eventYear, eventMonth, eventDay, toHour, toMinutes
                );

                // assign remaining fields
                newEvent.activityType = activityType;

                if (req.body.eventIsActive == 'on') {
                    newEvent.isActive = true;
                } else {
                    newEvent.isActive = false;
                }

                // finally, save to db
                newEvent.save((err, data, numAffected) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect('/admin/events')
                        console.log(`Added new event: ${newEvent.activityType.desc} on ${newEvent.eventDateTimes.date} from ${newEvent.eventDateTimes.from} to ${newEvent.eventDateTimes.to}`);
                    }
                })
            }
        })
    }
});

// update event
// update event
router.put('/:id', (req, res) => {
    console.log(req.body);
    if (!req.body.eventDate ||
        !req.body.eventFrom ||
        !req.body.eventTo ||
        !req.body.activityTypeId) {
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
                        // convert to Date object and parse it for other fields
                        var eventFullDate = new Date(req.body.eventDate);
                        var eventYear = eventFullDate.getYear();
                        var eventMonth = eventFullDate.getMonth();
                        var eventDay = eventFullDate.getDay();

                        event.eventDateTimes.date = eventFullDate;

                        // parse event from/to times
                        var fromParsed = req.body.eventFrom.split(':');
                        var fromHour = fromParsed[0];
                        var fromMinutes = fromParsed[1];

                        event.eventDateTimes.from = new Date(
                            eventYear, eventMonth, eventDay, fromHour, fromMinutes
                        );

                        var toParsed = req.body.eventTo.split(':');
                        var toHour = toParsed[0];
                        var toMinutes = toParsed[1];

                        event.eventDateTimes.to = new Date(
                            eventYear, eventMonth, eventDay, toHour, toMinutes
                        );

                        // assign remaining fields
                        event.activityType = activityType;

                        if (req.body.eventIsActive == 'on') {
                            event.isActive = true;
                        } else {
                            event.isActive = false;
                        }

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


/* These methods exist only for HTML forms. They use POST instead of PUT or DELETE since native HTML forms 
currently only support GET and PUT methods */

// update event
router.post('/:id', (req, res) => {
    console.log(req.body);
    if (!req.body.eventDate ||
        !req.body.eventFrom ||
        !req.body.eventTo ||
        !req.body.activityTypeId) {
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
                        // convert to Date object and parse it for other fields
                        var eventFullDate = new Date(req.body.eventDate);
                        var eventYear = eventFullDate.getYear();
                        var eventMonth = eventFullDate.getMonth();
                        var eventDay = eventFullDate.getDay();

                        event.eventDateTimes.date = eventFullDate;

                        // parse event from/to times
                        var fromParsed = req.body.eventFrom.split(':');
                        var fromHour = fromParsed[0];
                        var fromMinutes = fromParsed[1];

                        event.eventDateTimes.from = new Date(
                            eventYear, eventMonth, eventDay, fromHour, fromMinutes
                        );

                        var toParsed = req.body.eventTo.split(':');
                        var toHour = toParsed[0];
                        var toMinutes = toParsed[1];

                        event.eventDateTimes.to = new Date(
                            eventYear, eventMonth, eventDay, toHour, toMinutes
                        );

                        // assign remaining fields
                        event.activityType = activityType;

                        if (req.body.eventIsActive == 'on') {
                            event.isActive = true;
                        } else {
                            event.isActive = false;
                        }

                        // finally, save to db
                        event.save((err3, data, numAffected) => {
                            if (err3) {
                                res.send(err);
                            } else {
                                res.redirect('/admin/events');

                                console.log(`Updated event successfully.`);
                            }
                        })
                    }
                });
            }
        })
    }
});

// delete event
router.post('/delete/:id', (req, res) => {
    Event.remove({
        _id: req.params.id
    }, (err, event) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.redirect('/admin/events');

            console.log(`Deleted event successfully.`)
        }
    })
})

module.exports = router;