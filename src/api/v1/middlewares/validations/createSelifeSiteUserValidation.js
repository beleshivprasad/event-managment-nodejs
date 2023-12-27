const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { errorLog } = require("../../helpers/loggerHelper");

const selfieSiteUserSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.base": responseMessages.siteUsers.fieldValidation.firstName.base,
    "string.empty": responseMessages.siteUsers.fieldValidation.firstName.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.firstName.required
  }),
  lastName: Joi.string().required().messages({
    "string.base": responseMessages.siteUsers.fieldValidation.lastName.base,
    "string.empty": responseMessages.siteUsers.fieldValidation.lastName.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.lastName.required
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
  prudentialMarketingAccepted: Joi.boolean().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.prudentialMarketingAccepted.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.prudentialMarketingAccepted.required
  }),
  imageURL: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.image.empty,
    "any.required": responseMessages.event.fieldValidation.imageURL.required
  }),
  imageFileName: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.image.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.image.required
  }),
  imageS3BucketName: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.image.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.image.required
  }),
  imageS3Key: Joi.string().required().messages({
    "string.empty": responseMessages.siteUsers.fieldValidation.image.empty,
    "any.required": responseMessages.siteUsers.fieldValidation.image.required
  })
});

const createSelfieSiteUserValidation = async (req, res, next) => {
  try {
    const { error } = selfieSiteUserSchema.validate(req.body);

    if (error) {
      errorLog(error?.details[0]?.message, "createSelfieSiteUserValidation", __filename);

      return errorResponse(
        res,
        error?.details[0]?.message || responseMessages.common.wentWrong,
        error?.details
      );
    }

    next();
  } catch (error) {
    errorLog(error.message, "createSelfieSiteUserValidation", __filename, error);

    return errorResponse(res, error?.message, error);
  }
};

module.exports = createSelfieSiteUserValidation;
