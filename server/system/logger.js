const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: path.join(logDir, 'info.log'),
      level: 'info',
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: path.join(logDir, 'error.log'),
      handleExceptions: true,
      level: 'error',
    }),
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true,
      prettyPrint: true,
    }),
  ]
});

module.exports = logger;