const winston = require("winston");
const path = require("path");

const logDirectory = "/mindStaq_India/server/logs";

if (!require("fs").existsSync(logDirectory)) {
  require("fs").mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log"),
    }),
  ],
});

module.exports = {
  logger,
};
