const uploadToDrive = require("../lib/uploadToBoxDrive");

const { sendEmail } = require("../helpers/mailHelper");
const responseMessages = require("../helpers/responseMessages");

const { PUBLISH_IMAGE_TO_BILLBOARD } = require("../../../config/constants");

const publishImageOnBillboard = async (file, payload) => {
  try {
    const { email, name } = payload;

    await uploadToDrive(file);

    await sendEmail(PUBLISH_IMAGE_TO_BILLBOARD, { email, name });

    return {
      success: true,
      message: responseMessages.publishSelfie.success
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

module.exports = { publishImageOnBillboard };
