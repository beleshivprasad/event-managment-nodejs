const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");
const { logger } = require("../../../../logger");

const venueSchema = Joi.object({
  address: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.address.empty,
    "any.required": responseMessages.venue.fieldValidation.address.required
  }),
  imageURL: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.imageURL.required
  }),
  imageFileName: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.imageURL.required
  }),
  imageS3BucketName: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.imageURL.required
  }),
  imageS3Key: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.imageURL.required
  }),
  mapImageURL: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.mapImageURL.required
  }),
  mapImageFileName: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.mapImageURL.required
  }),
  mapImageS3BucketName: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.mapImageURL.required
  }),
  mapImageS3Key: Joi.string().required().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty,
    "any.required": responseMessages.venue.fieldValidation.mapImageURL.required
  })
});

const createVenueValidation = async (req, res, next) => {
  try {
    const { error } = venueSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "createVenueValidation",
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
      functionName: "createVenueValidation",
      fileName: __filename,
      error
    });

    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = createVenueValidation;
