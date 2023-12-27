const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");

const { logger } = require("../../../../logger/index");

const tokenValidationSchema = Joi.object({
  token: Joi.any().required().messages({
    "string.empty": responseMessages.login.token.empty,
    "any.required": responseMessages.login.token.required
  })
});

const tokenValidation = async (req, res, next) => {
  try {
    const { error } = tokenValidationSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "tokenValidation",
        fileName: __filename
      });

      return errorResponse(
        res,
        error?.details[0]?.message || responseMessages.common.wentWrong,
        error?.details
      );
    }

    next();
  } catch (error) {
    logger.error(error?.message || responseMessages.common.wentWrong, {
      functionName: "tokenValidation",
      fileName: __filename,
      error
    });
    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = tokenValidation;
