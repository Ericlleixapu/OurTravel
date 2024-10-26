
const authConfig = {
    jwtSecret: 'ourTravel_secret_key', // Secret per signar els tokens
    jwtExpiration: '5h',                               // Durada del token (5 hora en aquest cas)
    jwtRefreshExpiration: '7d'                         // Durada d'un token de refresc (7 dies)
};

module.exports = authConfig;