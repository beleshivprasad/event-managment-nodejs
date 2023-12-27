const newsTickerService = require("../services/newsTickerService");
const { errorResponse, successResponse } = require("../helpers/responseHandlers");
const { logger } = require("../../../logger/index");

const updateNewsTickerText = async (req, res) => {
  try {
    const response = await newsTickerService.updateNewsTickerText(req.body.text);

    if (response.success) {
      logger.info(response.message, {
        functionName: "updateNewsTickerText",
        fileName: __filename
      });

      return successResponse(res, response.message);
    }

    logger.error(response.message, {
      functionName: "updateNewsTickerText",
      fileName: __filename
    });

    return errorResponse(res, response.message);
  } catch (error) {
    logger.error(error.message, {
      fileName: __filename,
      functionName: "updateNewsTickerText",
      error
    });

    errorResponse(res, error.message, error);
  }
};

const getNewsTickerText = async (req, res) => {
  try {
    const response = await newsTickerService.getNewsTickerText();

    if (response.success) {
      logger.info(response.message, {
        functionName: "getNewsTickerText",
        fileName: __filename
      });

      return successResponse(res, response.message, response?.data);
    }

    logger.error(response.message, {
      functionName: "getNewsTickerText",
      fileName: __filename
    });

    return errorResponse(res, response.message);
  } catch (error) {
    logger.error(error.message, {
      fileName: __filename,
      functionName: "getNewsTickerText",
      error
    });

    errorResponse(res, error.message, error);
  }
};

module.exports = { updateNewsTickerText, getNewsTickerText };
