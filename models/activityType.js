var mongoose = require('mongoose');

var activityTypeSchema = new mongoose.Schema({
    desc: String,
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityType', activityTypeSchema);
module.exports.activityTypeSchema = activityTypeSchema;