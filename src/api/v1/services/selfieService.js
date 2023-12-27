const uploadToDrive = require("../lib/uploadToBoxDrive");

const { sendEmail } = require("../helpers/mailHelper");
const responseMessages = require("../helpers/responseMessages");

const { PUBLISH_IMAGE_TO_BILLBOARD, EVENT_BILLBOARD_FLOW, EVENT_DEFAULT_FLOW } = require("../../../config/constants");
const { convertDateToTimeZone } = require("../helpers/datetime");
const { EVENT_START_DATE, EVENT_START_TIME, EVENT_END_DATE, EVENT_END_TIME } = require("../../../config/env");

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

const eventFlowService = async (req, res) => {
  try {
    const startDateTime = convertDateToTimeZone(new Date(`${EVENT_START_DATE} ${EVENT_START_TIME}`));
    const endDateTime = convertDateToTimeZone(new Date(`${EVENT_END_DATE} ${EVENT_END_TIME}`));
    const currentDateTime = convertDateToTimeZone(new Date());

    return {
      success: true,
      message: responseMessages.eventFlow.success,
      data: {
        eventFlow: (currentDateTime >= startDateTime && currentDateTime <= endDateTime) ? EVENT_BILLBOARD_FLOW : EVENT_DEFAULT_FLOW
      }
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
}

module.exports = { publishImageOnBillboard, eventFlowService };
