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
    createdBy: {
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

/*    id?: string;
    name?: string;
    destinations: Destination[];
    journeys: Journey[];
    hotels: Hotel[];
    activities: Activity[];
    expenses: Expense[];
    images: Image[];
    documents: TravelDocument[];
    members: User[];
    createdBy: User;
    dateFrom?: Date|null; 
    dateTo?: Date|null;
    createdOn: Date;*/

module.exports = mongoose.model('Travel', travelSchema);
