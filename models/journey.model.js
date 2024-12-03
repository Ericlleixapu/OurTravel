const mongoose = require('mongoose');
const { Schema } = mongoose;

const journeySchema = new mongoose.Schema({
    locationFrom: {
        type: String,
        trim: true
    },
    locationTo: {
        type: String,
        trim: true
    },
    dateTimeFrom:
    {
        type: Date,
        default: Date.now
    },
    dateTimeTo:
    {
        type: Date,
        default: Date.now
    },
    comment:
    {
        type: String,
        trim: true
    },
    from:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    },
    to:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination'
    },
    travelId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    },
    journeyType:
    {
        type: String,
        trim: true
    },
    journeyDocuments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Journey', journeySchema);