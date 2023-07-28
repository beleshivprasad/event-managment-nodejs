const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { errorLog } = require("../../helpers/loggerHelper");

const publishImageSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": responseMessages.fieldValidation.name.base,
    "string.empty": responseMessages.fieldValidation.name.empty,
    "any.required": responseMessages.fieldValidation.name.required
  }),
  email: Joi.string().email().required().messages({
    "string.base": responseMessages.fieldValidation.email.base,
    "string.empty": responseMessages.fieldValidation.email.empty,
    "any.required": responseMessages.fieldValidation.email.required,
    "string.email": responseMessages.fieldValidation.email.invalid
  })
});

const publishImageValidation = async (req, res, next) => {
  try {
    const { error } = publishImageSchema.validate(req.body);

    if (error) {
      errorLog(error?.details[0]?.message, "createUserValidation", __filename);

      return errorResponse(res, error?.details[0]?.message, error?.details);
    }

    next();
  } catch (error) {
    errorLog(error.message, "publishImageValidation", __filename, error);

    return errorResponse(res, error?.message, error);
  }
};

module.exports = publishImageValidation;
