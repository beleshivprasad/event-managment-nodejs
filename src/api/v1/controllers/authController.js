const { errorResponse, successResponse } = require("../helpers/responseHandlers");
const responseMessages = require("../helpers/responseMessages");

const { logger } = require("../../../logger/index");

const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const response = await authService.login(req.body);

    if (response.success) {
      logger.info(responseMessages.login.success, {
        functionName: "login",
        fileName: __filename
      });

      return successResponse(res, responseMessages.login.success, { token: response.token });
    }

    logger.error(response.message, {
      functionName: "login",
      fileName: __filename
    });

    return errorResponse(res, response.message);
  } catch (error) {
    logger.error(error.message, {
      functionName: "login",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message, error);
  }
};

const validateToken = async (req, res) => {
  try {
    const token = req.body.token;

    const response = await authService.validateToken(token);

    if (response.success) {
      logger.info(responseMessages.login.token.valid, {
        functionName: "validateToken",
        fileName: __filename
      });

      return successResponse(res, responseMessages.login.token.valid);
    }

    logger.error(response.message, { fileName: __filename, functionName: "validateToken" });

    return errorResponse(res, response.message, response?.error, response?.statusCode);
  } catch (error) {
    logger.error(error.message, { fileName: __filename, functionName: "validateToken", error });

    errorResponse(res, error?.message, error);
  }
};

module.exports = { login, validateToken };
