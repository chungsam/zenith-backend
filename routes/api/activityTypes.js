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
    })
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

    if (!req.body.desc) {
        res.status(400);
        res.json({
            "error": "Bad data, could not add to database."
        })
    } else {
        newActivityType.desc = req.body.desc;

        // finally, save to db
        newActivityType.save((err, data, numAffected) => {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.json(data);

                console.log(`Added new activity type: ${newActivityType.desc}`);
            }
        })
    }
});

// update activity type
router.put('/:id', (req, res) => {
    if (!req.body.desc) {
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
                activityType.desc = req.body.desc;

                res.json({
                    "message": "Successfully updated activity type."
                });

                console.log(`Updated activity type: ${activityType.desc}`);
            }
        });
    }
});

// delete activity type
router.delete('/:id', (req, res) => {
    ActivityType.remove({
        _id: req.params.id
    }, (err, activityType) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.json({
                "message": "Successfully deleted activity type."
            });

            console.log(`Deleted activity type: ${activityType.desc}`);
        }
    })
})

module.exports = router;