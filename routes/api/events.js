var express = require('express');
var router = express.Router();

var Event = require('../../models/event');

router.get('/', (req, res) => {
    res.send('hi from events!');
});

module.exports = router;