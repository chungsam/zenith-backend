var mongoose = require('mongoose');
var ActivityTypeSchema = require('./activityType').activityTypeSchema;

var eventSchema = mongoose.Schema({
    eventDateTimes: {
        date: Date,
        from: Date,
        to: Date
    },
    activityType: ActivityTypeSchema,
    isActive: Boolean,
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Event", eventSchema);

