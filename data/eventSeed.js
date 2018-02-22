var eventSchema = mongoose.Schema({
    eventDateTimes: {
        from: Date,
        To: Date
    },
    activityType: ActivityTypeSchema,
    isActive: Boolean,
    creationDate: Date
});

module.exports = {
    "events": [
        {
            "eventDateTimes": {
                "from": new Date(),
                "to": new Date(),
            },
            activityType: "",
            IsActive: true,
        }
    ]
}