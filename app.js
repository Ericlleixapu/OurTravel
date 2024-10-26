const mongoose = require('mongoose');
mongoose.connect('mongodb://ourtravel:ourtravelPassword@192.168.1.11:27017/Auth');

const User = mongoose.model('User', { name: String });

const kitty = new User({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));