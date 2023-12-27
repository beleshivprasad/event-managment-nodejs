const { errorResponse } = require("./responseHandlers");
const responseMessages = require("./responseMessages");

const { logger } = require("../../../logger/index");

const unmatchedRouteHandler = async (req, res, next) => {
  logger.error(responseMessages.common.routeNotFound, {
    functionName: "unmatchedRouteHandler",
    fileName: __filename
  });

  errorResponse(
    res,
    responseMessages.common.routeNotFound,
    { requestedMethod: req.method, requestedURL: req.originalUrl },
    404
  );
};

module.exports = unmatchedRouteHandler;
