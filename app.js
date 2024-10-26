const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.connect('mongodb://ourtravel:ourtravelPassword@192.168.1.11:27017/OurTravel');

const kitty = new User();
kitty.name = "name";
kitty.email = "email";

kitty.save().then(() => console.log('meow'));