const coreJoi = require("joi");
const joiDate = require("@joi/date");

const Joi = coreJoi.extend(joiDate);

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { errorLog } = require("../../helpers/loggerHelper");

const { ACTIVE, INACTIVE, ONGOING, DONE } = require("../../../../config/constants");

const eventSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.name.empty
  }),
  description: Joi.any(),
  status: Joi.string().valid(ACTIVE, INACTIVE, ONGOING, DONE).messages({
    "any.only": responseMessages.event.fieldValidation.status.invalid
  }),
  imageURL: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty
  }),
  imageFileName: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty
  }),
  imageS3BucketName: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty
  }),
  imageS3Key: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.imageURL.empty
  }),
  date: Joi.date().format("YYYY-MM-DD").messages({
    "date.format": responseMessages.event.fieldValidation.date.base,
    "string.empty": responseMessages.event.fieldValidation.date.empty
  }),
  startTime: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.startTime.empty
  }),
  endTime: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.endTime.empty
  }),
  venueID: Joi.string().messages({
    "string.empty": responseMessages.event.fieldValidation.venueID.empty
  })
});

const updateEventValidation = async (req, res, next) => {
  try {
    const { error } = eventSchema.validate(req.body);

    if (error) {
      errorLog(error?.details[0]?.message, "updateEventValidation", __filename);

      return errorResponse(
        res,
        error?.details[0]?.message || responseMessages.common.wentWrong,
        error?.details
      );
    }

    next();
  } catch (error) {
    errorLog(error.message, "updateEventValidation", __filename, error);

    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = updateEventValidation;
