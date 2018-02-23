var express = require('express');
var router = express.Router();

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

// get all activity types
router.get('/', (req, res) => {
    ActivityType.find({}, (err, data) => {
        if (err) {
            res.status(400);
            res.send(err);
        }
        res.json(data);
    });
});

// get activity type by id
router.get('/:id', (req, res) => {
    ActivityType.findById(req.params.id, (err, activityType) => {
        if (err) {
            res.status(400);
            res.send(err);
        }
        res.json(activityType);
    })
});

// add activity type
router.post('/', (req, res) => {
    var newActivityType = new ActivityType();

    if (!req.body.activityTypeDesc) {
        res.status(400);
        res.json({
            "error": "Bad data, could not add to database."
        })
    } else {
        newActivityType.desc = req.body.activityTypeDesc;

        // finally, save to db
        newActivityType.save((err, data, numAffected) => {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.redirect('/admin/activityTypes');
                console.log(`Added new activity type: ${newActivityType.desc}`);
            }
        })
    }
});

// update activity type
router.put('/:id', (req, res) => {
    console.log(req.body);
    if (!req.body.activityTypeDesc) {
        res.status(400);
        res.send({
            "error": "Bad data, could not update."
        });
    } else {
        ActivityType.findById(req.params.id, (err, activityType) => {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                activityType.desc = req.body.activityTypeDesc;

                activityType.save((err, data, numAffected) => {
                    if (err) {
                        res.send(err);
                    } else {

                        console.log(`Updated activity type: ${activityType.desc}`);
                        res.json(data);
                    }
                })
            }
        });
    }
});

// delete activity type
router.delete('/delete/:id', (req, res) => {
    ActivityType.remove({
        _id: req.params.id
    }, (err, activityType) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.json(activityType);

            console.log(`Deleted activity type: ${activityType.desc}`);
        }
    })
})

/* These methods exist only for HTML forms. They use POST instead of PUT or DELETE since native HTML forms 
currently only support GET and PUT methods */


// update activity type
router.post('/:id', (req, res) => {
    console.log(req.body);
    if (!req.body.activityTypeDesc) {
        res.status(400);
        res.send({
            "error": "Bad data, could not update."
        });
    } else {
        ActivityType.findById(req.params.id, (err, activityType) => {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                activityType.desc = req.body.activityTypeDesc;

                activityType.save((err, data, numAffected) => {
                    if (err) {
                        res.send(err);
                    } else {

                        console.log(`Updated activity type: ${activityType.desc}`);
                        res.redirect('/admin/activityTypes');
                    }
                })
            }
        });
    }
});


router.post('/delete/:id', (req, res) => {
    ActivityType.remove({
        _id: req.params.id
    }, (err, activityType) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.redirect('/admin/activityTypes');

            console.log(`Deleted activity type: ${activityType.desc}`);
        }
    })
})

module.exports = router;