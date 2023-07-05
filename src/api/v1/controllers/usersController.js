const { errorResponse, successResponse } = require("../helpers/responseHandlers");
const responseMessages = require("../helpers/responseMessages");

const { logger } = require("../../../logger");

const usersService = require("../services/usersService");

const createUser = async (req, res) => {
  try {
    const response = await usersService.createUser(req.body);

    if (response.success) {
      logger.info(responseMessages.createUser.success, {
        functionName: "createUser",
        fileName: __filename
      });

      return successResponse(res, responseMessages.createUser.success, { user: response.user });
    }

    logger.error(response.message, {
      fileName: __filename,
      functionName: "createUser",
      error: response?.error || {}
    });

    return errorResponse(res, response.message);
  } catch (error) {
    logger.error(error.message, { fileName: __filename, functionName: "createUser", error });

    errorResponse(res, error.message, error);
  }
};

module.exports = { createUser };
