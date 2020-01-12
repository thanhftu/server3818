const { createLogger, transports, format } = require("winston");
// require("winston-mongodb");
const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: "logger.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: "errorLogger.log",
      level: "error",
      options: { handleExceptions: true },
      format: format.combine(format.timestamp(), format.json())
    })
    // new transports.MongoDB({
    //   level: "info",
    //   db:
    //     "mongodb+srv://thanhdhnt:Donga130@contactkeeper-uo0tn.mongodb.net/vidly?retryWrites=true&w=majority",
    //   options: {
    //     useUnifiedTopology: true
    //   },
    //   format: format.combine(format.timestamp(), format.json())
    // })
  ],
  exceptionHandlers: [new transports.File({ filename: "exceptions.log" })]
});

module.exports = logger;
