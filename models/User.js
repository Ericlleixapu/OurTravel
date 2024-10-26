const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    surname:String,
    email: String,
    password: String,//(xifrada si es fa servir autenticació per correu)
    oauthProvider: String,//(Google, Facebook, etc., opcional)
    profilePicture: String,//(URL de la imatge de perfil)
   // createdAt: Date,
    //updatedAt: Date,
    //trips: []
});

module.exports = mongoose.model('User', userSchema);