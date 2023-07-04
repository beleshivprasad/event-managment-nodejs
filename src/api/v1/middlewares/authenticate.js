const { errorResponse } = require("../helpers/responseHandlers");
const { verifyToken } = require("../helpers/jwtHelper");
const responseMessages = require("../helpers/responseMessages");

const { logger } = require("../../../logger/index");

const authenticate = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    const token = authorizationHeader && authorizationHeader.split(" ")[1];

    if (token) {
      const response = await verifyToken(token);

      if (response.success) {
        logger.info(responseMessages.login.token.valid, {
          fileName: __filename,
          functionName: "authenticate"
        });

        req.user = user;
        next();
      } else {
        logger.error(response?.message || responseMessages.login.token.invalid, {
          fileName: __filename,
          functionName: "authenticate"
        });

        return errorResponse(
          res,
          response?.message || responseMessages.login.token.invalid,
          response?.error,
          response?.statusCode
        );
      }
    } else {
      logger.error(responseMessages.login.token.required, {
        fileName: __filename,
        functionName: "authenticate"
      });

      return errorResponse(res, responseMessages.login.token.required, undefined, 401);
    }
  } catch (error) {
    logger.error(error.message, { fileName: __filename, functionName: "authenticate", error });

    errorResponse(res, error?.message, error, 401);
  }
};

module.exports = authenticate;
