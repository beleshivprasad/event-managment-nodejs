const selfieService = require("../services/selfieService");

const { errorResponse, successResponse } = require("../helpers/responseHandlers");
const responseMessages = require("../helpers/responseMessages");
const { infoLog, errorLog } = require("../helpers/loggerHelper");

const publishImageOnBillboard = async (req, res) => {
  try {
    if (req.file) {
      const response = await selfieService.publishImageOnBillboard(req.file, req.body);

      if (response.success) {
        infoLog(response.message, "publiSshImageOnBillboard", __filename);

        return successResponse(res, response?.message, response.data);
      }

      errorLog(response.message, "publishImageOnBillboard", __filename, response?.error || {});

      return errorResponse(res, response?.message, response.error);
    }

    errorLog(
      responseMessages.publishSelfie.selfieNotProvided,
      "publishImageOnBillboard",
      __filename
    );

    return errorResponse(res, responseMessages.publishSelfie.selfieNotProvided);
  } catch (error) {
    errorLog(error?.message, "publishImageOnBillboard", __filename, error);

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

module.exports = { publishImageOnBillboard };
