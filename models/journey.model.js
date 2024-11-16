const mongoose = require('mongoose');
const { Schema } = mongoose;

const journeySchema = new Schema({

});

module.exports = mongoose.model('Journey', journeySchema);