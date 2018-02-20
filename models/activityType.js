var mongoose = require('mongoose');

var activityTypeSchema = new mongoose.Schema({
    ActivityId: {
        type: String
    },
    ActivityDesc: {
        type: String
    },
    CreationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityType', activityTypeSchema);