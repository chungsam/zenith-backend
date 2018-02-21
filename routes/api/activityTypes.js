var express = require('express');
var router = express.Router();

var Event = require('../../models/activityType');

router.get('/', (req, res) => {
    res.send('hi from activityTypes!');
});

module.exports = router;