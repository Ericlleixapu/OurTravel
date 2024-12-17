const mongoose = require('mongoose');

process.loadEnvFile();
const user = process.env.MONGO_USER || "defaultUser";
const password = process.env.MONGO_PASSWORD || "defaultPassword";
const host = process.env.MONGO_HOST || "localhost";
const port = process.env.MONGO_PORT || 27017;
const db = process.env.MONGO_DB || "defaultDB";

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