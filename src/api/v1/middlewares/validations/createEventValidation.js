const coreJoi = require("joi");
const joiDate = require("@joi/date");

const Joi = coreJoi.extend(joiDate);

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { ACTIVE, INACTIVE, ONGOING, DONE } = require("../../../../config/constants");
const { logger } = require("../../../../logger");

const eventSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.name.empty,
    "any.required": responseMessages.event.fieldValidation.name.required
  }),
  description: Joi.any(),
  status: Joi.string().valid(ACTIVE, INACTIVE, ONGOING, DONE).messages({
    "any.only": responseMessages.event.fieldValidation.status.invalid
  }),
  imageURL: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty,
    "any.required": responseMessages.event.fieldValidation.imageURL.required
  }),
  imageFileName: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty,
    "any.required": responseMessages.event.fieldValidation.imageURL.required
  }),
  imageS3BucketName: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty,
    "any.required": responseMessages.event.fieldValidation.imageURL.required
  }),
  imageS3Key: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty,
    "any.required": responseMessages.event.fieldValidation.imageURL.required
  }),
  date: Joi.date().format("YYYY-MM-DD").required().messages({
    "date.format": responseMessages.event.fieldValidation.date.base,
    "string.empty": responseMessages.event.fieldValidation.date.empty,
    "any.required": responseMessages.event.fieldValidation.date.required
  }),
  startTime: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.startTime.empty,
    "any.required": responseMessages.event.fieldValidation.startTime.required
  }),
  endTime: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.endTime.empty,
    "any.required": responseMessages.event.fieldValidation.endTime.required
  }),
  venueID: Joi.string().required().messages({
    "string.empty": responseMessages.event.fieldValidation.venueID.empty,
    "any.required": responseMessages.event.fieldValidation.venueID.required
  })
});

const createEventValidation = async (req, res, next) => {
  try {
    const { error } = eventSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "createEventValidation",
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
    logger.error(error.message, {
      functionName: "createEventValidation",
      fileName: __filename,
      error
    });
    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = createEventValidation;
