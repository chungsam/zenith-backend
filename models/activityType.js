var mongoose = require('mongoose');

var activityTypeSchema = new mongoose.Schema({
    ActivityId: String,
    ActivityDesc: String,
    CreationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityType', activityTypeSchema);