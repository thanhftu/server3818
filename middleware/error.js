// const logger = require("../utils/logger");
const winston = require("winston");
module.exports = (err, req, res, next) => {
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Server error");
};