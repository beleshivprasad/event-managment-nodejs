const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { errorLog } = require("../../helpers/loggerHelper");

const broadwaySiteUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": responseMessages.siteUsers.fieldValidation.name.base,
    "string.empty": responseMessages.siteUsers.fieldValidation.name.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.name.required
  }),
  email: Joi.string().email().required().messages({
    "string.base": responseMessages.fieldValidation.email.base,
    "string.empty": responseMessages.fieldValidation.email.empty,
    "any.required": responseMessages.fieldValidation.email.required,
    "string.email": responseMessages.fieldValidation.email.invalid
  }),
  zipCode: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.zipCode.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.zipCode.required
  }),
  phoneNumber: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.phoneNumber.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.phoneNumber.required
  }),
  emailMarketingOpted: Joi.string().valid(true, false).messages({
    "any.only": responseMessages.siteUsers.fieldValidation.common.invalid
  }),
  phoneNumberMarketingOpted: Joi.string().valid(true, false).messages({
    "any.only": responseMessages.siteUsers.fieldValidation.common.invalid
  }),
  privacyPolicyAccepted: Joi.string().valid(true, false).messages({
    "any.only": responseMessages.siteUsers.fieldValidation.common.invalid
  })
});

const createBroadwaySiteUserValidation = async (req, res, next) => {
  try {
    const { error } = broadwaySiteUserSchema.validate(req.body);

    if (error) {
      errorLog(error?.details[0]?.message, "createBroadwaySiteUserValidation", __filename);

      return errorResponse(
        res,
        error?.details[0]?.message || responseMessages.common.wentWrong,
        error?.details
      );
    }

    next();
  } catch (error) {
    errorLog(error.message, "createBroadwaySiteUserValidation", __filename, error);

    return errorResponse(res, error?.message, error);
  }
};

module.exports = createBroadwaySiteUserValidation;
