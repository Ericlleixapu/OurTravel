const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    address:
    {
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
    },
    hotelDocuments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        }
    ]
});


module.exports = mongoose.model('Hotel', hotelSchema);