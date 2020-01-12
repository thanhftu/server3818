const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("config");

module.exports = () => {
  const db = config.get("db");
  const regex = new RegExp("test");
  const env = db.match(regex) ? "test" : "dev";
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => logger.info(`MongoDB connected on ${env}...`));
};
