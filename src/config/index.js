require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME,
    jwtToken: process.env.JWT_SECRET    
}