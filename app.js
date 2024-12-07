
const express = require('express');
const cors = require("cors");
const connectToDatabase = require('./config/db.config'); // Importa la funció de connexió

const app = express();

// Middleware de configuració (body-parser, headers, etc.)
app.use(express.json());
app.use(cors());

app.use((req,res,next) =>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method,req.hostname, req.path);
    next();
});

// Connexió a la base de dades
connectToDatabase();

// Rutes
const authRoutes = require('./routes/auth.routes');
const imageRoutes = require('./routes/image.routes');
const filesRoutes = require('./routes/files.routes');
const userRoutes = require('./routes/user.routes');
const travelRoutes = require('./routes/travel.routes');
const destinationRoutes = require('./routes/destination.routes');
const journeyRoutes = require('./routes/journey.routes');
const hotelRoutes = require('./routes/hotel.routes');
const activityRoutes = require('./routes/activity.routes');

app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/file', filesRoutes);
app.use('/api/user', userRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/journey', journeyRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/activity', activityRoutes);


// Inicialitza el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`OurTravel server running on port ${PORT}`);
});