const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY",
  // expecting process.env.ALLOWED_ORIGINS to be a comma separated origins string with no space eg. "url1,url2,url3"
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"],
  JWT_SIGN_OPTIONS: {
    expiresIn: process.env.JWT_TOKEN_EXPIRE_DURATION || "3d"
  },
  APP_TIME_ZONE: process.env.APP_TIME_ZONE || "Asia/Kolkata"
};
