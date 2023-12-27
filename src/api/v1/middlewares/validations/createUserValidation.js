const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");

const { logger } = require("../../../../logger");

const createUserSchema = Joi.object({
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
  }),

  password: Joi.alternatives().try(Joi.string().min(8), Joi.number().min(8)).required().messages({
    "string.empty": responseMessages.fieldValidation.password.empty,
    "any.required": responseMessages.fieldValidation.password.required,
    "string.min": responseMessages.fieldValidation.password.min,
    "number.min": responseMessages.fieldValidation.password.min
  })
});

const createUserValidation = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "createUserValidation",
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
      functionName: "createUserValidation",
      fileName: __filename
    });
    return errorResponse(res, error?.message, error);
  }
};

module.exports = createUserValidation;
