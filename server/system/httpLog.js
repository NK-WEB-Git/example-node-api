const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
const fs = require( 'fs' );

const logDir = `${__dirname}/../../var/logs`; // directory path you want to set

if ( !fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
      prettyPrint: true,
    })
  ]
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
    }),
    new winston.transports.File({
      name: 'info-file',
      filename: path.join(logDir, 'http.log'),
      level: 'info',
    }),
  ],
  msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});

module.exports = { errorLogger, requestLogger };
