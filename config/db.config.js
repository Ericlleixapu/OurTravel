const mongoose = require('mongoose');

const user = "ourtravel";
const password = "ourtravelPassword";
const host = "192.168.1.11";
const port = 27017;
const db = "OurTravel";

const dbConfig = "mongodb://"+user+":"+password+"@"+host+":"+port+"/"+db;

// Funció per inicialitzar la connexió amb MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbConfig);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Atura l'app si hi ha un error greu de connexió
    }
};

module.exports = connectToDatabase;