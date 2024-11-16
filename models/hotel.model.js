const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({

});

module.exports = mongoose.model('Hotel', hotelSchema);