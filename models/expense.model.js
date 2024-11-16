const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({

});

module.exports = mongoose.model('Expense', expenseSchema);