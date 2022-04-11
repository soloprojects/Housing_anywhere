const winston = require("winston");

/**
 * Log only the messages the match `level`.
 */
function filterOnly(level) {
  // eslint-disable-next-line consistent-return
  return winston.format(function (info) {
    if (info.level === level) {
      return info;
    }
  })();
}

const logger = function (module) {
  var path =  module && module.filename ?  module.filename.split('/').slice(-2).join('/') : 'NO DATA';
  return winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(info => `${info.timestamp} [${path}] ${info.level}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console({level: "error"}),
      new winston.transports.File({filename: "./logs/error.log", level: "error"}),
      new winston.transports.File({filename: "./logs/debug.log", level: "debug"}),
      new winston.transports.File({
        filename: "./logs/access.log",
        level: "silly",
        format: filterOnly("silly")
      })
    ],
    exceptionHandlers: [
      new winston.transports.File({filename: "./logs/exceptions.log"})
    ]
  });
}


module.exports = logger;
module.exports.stream = {
  write(message) {
    loggerObj = logger();
    loggerObj.silly(message);
  }
};