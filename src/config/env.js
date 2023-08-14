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
  APP_TIME_ZONE: process.env.APP_TIME_ZONE || "Asia/Kolkata",
  BOX_DRIVE_CLIENT_ID: process.env.BOX_DRIVE_CLIENT_ID,
  BOX_DRIVE_CLIENT_SECRET: process.env.BOX_DRIVE_CLIENT_SECRET,
  BOX_DRIVE_FOLDER_ID: process.env.BOX_DRIVE_FOLDER_ID,
  BOX_DRIVE_DEVELOPER_TOKEN: process.env.BOX_DRIVE_DEVELOPER_TOKEN,
  BOX_DRIVE_FOLDER_NAM: process.env.BOX_DRIVE_FOLDER_NAME,
  BOX_DRIVE_KEY_ID: process.env.BOX_DRIVE_KEY_ID,
  BOX_DRIVE_PRIVATE_KEY: process.env.BOX_DRIVE_PRIVATE_KEY,
  BOX_DRIVE_PASS_PHRASE: process.env.BOX_DRIVE_PASS_PHRASE,
  BOX_DRIVE_APP_AUTH_CLIENT: process.env.BOX_DRIVE_APP_AUTH_CLIENT,
  BOX_DRIVE_APP_AUTH_CLIENT_ID: process.env.BOX_DRIVE_APP_AUTH_CLIENT_ID
};
