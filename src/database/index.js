const mongoose = require("mongoose");
const { Config } = require("../config");
const debug = require("debug")("app:module-database");

var connection = mongoose.connection
module.exports.Database = () => {
  try {
    // if(!connection){
      let uri = `${Config.mongoUri}`;
      mongoose.connect(uri, {dbName: Config.mongoDbname}, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      connection.once('open', () => {
        debug("Connected to MongoDB Atlas");
      })
  } catch (err) {
    connection.on('error', (err) => {
      debug("Connected to MongoDB Atlas failed");
    })
  }
};