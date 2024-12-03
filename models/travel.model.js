const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    destinations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Destination'
        }
    ],
    journeys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Journey'
        }
    ],
    hotels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
    activities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ],
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense'
        }
    ],
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image'
        }
    ],
    documents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TravelDocument'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateFrom: {
        type: Date,
        default: Date.now
    },
    dateTo: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Travel', travelSchema);
