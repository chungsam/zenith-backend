var mongoose = require('mongoose');
var ActivityTypeSchema = require('./activityType').activityTypeSchema;

var eventSchema = mongoose.Schema({
    EventId: String,
    EventDateTimes: {
        From: Date,
        To: Date
    },
    ActivityType: ActivityTypeSchema,
    IsActive: Boolean,
    CreationDate: Date
});

