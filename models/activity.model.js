const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({

});

module.exports = mongoose.model('Activity', activitySchema);