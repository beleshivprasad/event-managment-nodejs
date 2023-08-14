const BoxSDK = require("box-node-sdk");

const env = require("../../../config/env");

const { infoLog, errorLog } = require("../helpers/loggerHelper");

const uploadToDrive = async file => {
  try {
    // Initialize the SDK with creds
    const sdk = new BoxSDK({
      clientID: env.BOX_DRIVE_CLIENT_ID,
      clientSecret: env.BOX_DRIVE_CLIENT_SECRET,
      appAuth: {
        keyID: env.BOX_DRIVE_KEY_ID,
        privateKey: env.BOX_DRIVE_PRIVATE_KEY,
        passphrase: env.BOX_DRIVE_PASS_PHRASE
      }
    });

    // Create a client with an enterprise token
    const client = sdk.getAppAuthClient(
      env.BOX_DRIVE_APP_AUTH_CLIENT,
      env.BOX_DRIVE_APP_AUTH_CLIENT_ID
    );

    // Upload the file
    const fileUploadResponse = await client.files.uploadFile(
      env.BOX_DRIVE_FOLDER_ID,
      file.originalname,
      file.buffer
    );

    // File upload successful
    infoLog(
      `File Uploaded Successfully ${fileUploadResponse.entries[0].name}`,
      "uploadToDrive",
      __filename
    );
  } catch (error) {
    errorLog(
      `Error uploading file to box drive, ${error?.message}`,
      "uploadToDrive",
      __filename,
      error
    );
  }
};

module.exports = uploadToDrive;
