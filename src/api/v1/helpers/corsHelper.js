const env = require("../../../config/env");

const allowedOrigins = env.ALLOWED_ORIGINS;

corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

module.exports = corsOptions;
