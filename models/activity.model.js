const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    date:
    {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        trim: true
    },
    destination:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    travelId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);