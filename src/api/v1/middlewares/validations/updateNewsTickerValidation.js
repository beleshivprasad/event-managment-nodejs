const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");

const { logger } = require("../../../../logger");

const updateNewsTickerSchema = Joi.object({
  text: Joi.string().allow("").required().messages({
    "string.base": responseMessages.newsTicker.fieldValidation.text.base,
    "any.required": responseMessages.newsTicker.fieldValidation.text.required
  })
});

const updateNewsTickerValidation = async (req, res, next) => {
  try {
    const { error } = updateNewsTickerSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "updateNewsTickerValidation",
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
      functionName: "updateNewsTickerValidation",
      fileName: __filename
    });
    return errorResponse(res, error?.message, error);
  }
};

module.exports = updateNewsTickerValidation;
