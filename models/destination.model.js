const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({

});

module.exports = mongoose.model('Destination', destinationSchema);