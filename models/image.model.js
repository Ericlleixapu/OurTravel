const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    fileType: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    viewers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],    
    comments: [
        {
            type: String,
            trim: true
        }
    ],
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    travelId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    }
});

module.exports = mongoose.model('Image', imageSchema);