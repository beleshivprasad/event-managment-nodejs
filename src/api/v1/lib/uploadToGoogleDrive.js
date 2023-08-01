const stream = require("stream");
const path = require("path");
const { google } = require("googleapis");

const { KEY_FILE_PATH, SCOPES, DATA_FIELDS } = require("../../../config/constants");

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES
});
const uploadToDrive = async (file, email) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  const { data } = await google
    .drive({
      version: "v3",
      auth
    })
    .files.create({
      media: {
        mimeType: file.mimeType,
        body: bufferStream
      },
      requestBody: {
        name: file.originalname,
        parents: [`${process.env.REACT_APP_GOOGLE_DRIVE_ID}`]
      },
      fields: DATA_FIELDS
    });

  return { id: data.id, name: data.name };
};

module.exports = { uploadToDrive };
