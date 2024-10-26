
const express = require('express');
const cors = require("cors");
const connectToDatabase = require('./config/db.config'); // Importa la funció de connexió

const app = express();

// Middleware de configuració (body-parser, headers, etc.)
app.use(express.json());
app.use(cors());

// Connexió a la base de dades
connectToDatabase();

// Rutes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Inicialitza el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`OurTravel server running on port ${PORT}`);
});