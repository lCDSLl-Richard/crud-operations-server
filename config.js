const dotenv = require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB:
    process.env.DB ||
    "DB=mongodb://mongo:WINiyyifZ4eDP6KB7rS3@containers-us-west-38.railway.app:7472",
};
