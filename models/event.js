var mongoose = require('mongoose');
var ActivityType = require('./activityType');

var eventSchema = mongoose.Schema({
    EventId: String,
    EventDateTimes: {
        From: Date,
        To: Date
    },
    ActivityType: ActivityType,
    IsActive: boolean,
    CreationDate: Date
});

