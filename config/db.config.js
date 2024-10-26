require('dotenv').config();  // Carrega les variables d'entorn

const mongoose = require('mongoose');

const dbConfig = {
    url: process.env.DB_URL,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
};

// Funció per inicialitzar la connexió amb MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbConfig.url, dbConfig.options);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Atura l'app si hi ha un error greu de connexió
    }
};

module.exports = connectToDatabase;