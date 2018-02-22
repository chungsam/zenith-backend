var mongoose = require('mongoose');
var ActivityTypeSchema = require('./activityType').activityTypeSchema;

var eventSchema = mongoose.Schema({
    eventDateTimes: {
        From: Date,
        To: Date
    },
    activityType: ActivityTypeSchema,
    isActive: Boolean,
    creationDate: Date
});

