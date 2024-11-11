const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    filename: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default:""
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
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', imageSchema);