const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");

const { logger } = require("../../../../logger/index");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": responseMessages.fieldValidation.email.base,
    "string.empty": responseMessages.fieldValidation.email.empty,
    "any.required": responseMessages.fieldValidation.email.required,
    "string.email": responseMessages.fieldValidation.email.invalid
  }),

  password: Joi.alternatives().try(Joi.string(), Joi.number()).required().messages({
    "string.empty": responseMessages.fieldValidation.password.empty,
    "any.required": responseMessages.fieldValidation.password.required
  })
});

const loginValidation = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "loginValidation",
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
      functionName: "loginValidation",
      fileName: __filename,
      error
    });

    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = loginValidation;
