const mongoose = require('mongoose');
const { Schema } = mongoose;

const travelDocumentSchema = new Schema({

});

module.exports = mongoose.model('TravelDocument', travelDocumentSchema);