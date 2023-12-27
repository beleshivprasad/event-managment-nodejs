const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { errorLog } = require("../../helpers/loggerHelper");

const festivalSiteUserSchema = Joi.object({
  ip: Joi.string().required().messages({
    "string.base": responseMessages.siteUsers.fieldValidation.ip.empty,
    "string.empty": responseMessages.siteUsers.fieldValidation.ip.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.ip.required
  })
});

const createFestivalSiteUserValidation = async (req, res, next) => {
  try {
    const { error } = festivalSiteUserSchema.validate(req.body);

    if (error) {
      errorLog(error?.details[0]?.message, "createFestivalSiteUserValidation", __filename);

      return errorResponse(
        res,
        error?.details[0]?.message || responseMessages.common.wentWrong,
        error?.details
      );
    }

    next();
  } catch (error) {
    errorLog(error.message, "createFestivalSiteUserValidation", __filename, error);

    return errorResponse(res, error?.message, error);
  }
};

module.exports = createFestivalSiteUserValidation;
