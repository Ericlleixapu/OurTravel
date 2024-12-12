const mongoose = require('mongoose');
const { Schema } = mongoose;

const DocumentSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  destination: {
    type: String,
    trim: true
  },
  comment: {
    type: String,
    trim: true
  },
  documentUrl: {
    type: String,
    trim: true,
    immutable: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  filename: {
    type: String,
    trim: true,
    immutable: true,
  },
  fileType: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  travelId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travel',
    required: true
  }
});

/*  _id?: string;
  name: string;
  type: string;
  destination?: Destination;
  comment?: string;
  documentUrl: string;
  uploadDate: Date;
  filename: string;
  fileType: string;
  uploadedBy: string;
  travelId: string;*/

module.exports = mongoose.model('Document', DocumentSchema);