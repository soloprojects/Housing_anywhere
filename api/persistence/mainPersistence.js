// Import the mongoose module
const mongoose = require("mongoose");
const logger = require("../config/logger")(module);
// DEBUG
mongoose.set('debug', true)
// Set up default mongoose connection
// URL WITH DOCKER CONTAINER HOSTNAME
const mongoDBUrl = process.env.DATABASE_URL;
logger.info(`database url ${mongoDBUrl}`);
mongoose.connect(mongoDBUrl, {useNewUrlParser: true})
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', function() {
  // we're connected!
  logger.info("Database connected");
});
exports.getDb = () => {
  return db;
};


