const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true
    },    
    location: {
        type: String,
        required: true,
        trim: true
    },
    dateFrom: {
        type: Date,
        required: true
    },
    dateTo: {
        type: Date,
        required: true
    },
    comment: {
        type: String
    },
    travelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    },
    imageUrl: {
        type: String
    }
});

module.exports = mongoose.model('Destination', destinationSchema);