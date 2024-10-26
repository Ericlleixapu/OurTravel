const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    destinations: [
        {
            location: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    activities: [
        {
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            description: String
        }
    ],
    budget: {
        type: Number,
        default: 0
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Travel', travelSchema);
