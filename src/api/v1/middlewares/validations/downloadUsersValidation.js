const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");

const { logger } = require("../../../../logger/index");

const downloadUserSchema = Joi.object({
  userType: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.userType.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.userType.required
  })
});

const downloadUsersValidation = async (req, res, next) => {
  try {
    const { error } = downloadUserSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "downloadUsersValidation",
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
      functionName: "downloadUsersValidation",
      fileName: __filename,
      error
    });

    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = downloadUsersValidation;
