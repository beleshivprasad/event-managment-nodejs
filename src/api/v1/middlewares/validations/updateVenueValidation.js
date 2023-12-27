const Joi = require("joi");

const { errorResponse } = require("../../helpers/responseHandlers");
const responseMessages = require("../../helpers/responseMessages");

const { logger } = require("../../../../logger/index");

const updateVenueSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.name.empty
  }),
  address: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.address.empty
  }),
  imageURL: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty
  }),
  imageFileName: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty
  }),
  imageS3BucketName: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty
  }),
  imageS3Key: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.imageURL.empty
  }),
  mapImageURL: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty
  }),
  mapImageFileName: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty
  }),
  mapImageS3BucketName: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty
  }),
  mapImageS3Key: Joi.string().messages({
    "string.empty": responseMessages.venue.fieldValidation.mapImageURL.empty
  })
});

const updateVenueValidation = async (req, res, next) => {
  try {
    const { error } = updateVenueSchema.validate(req.body);

    if (error) {
      logger.error(error?.details[0]?.message || responseMessages.common.wentWrong, {
        functionName: "updateVenueValidation",
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
      functionName: "updateVenueValidation",
      fileName: __filename,
      error
    });

    return errorResponse(res, error?.message || responseMessages.common.wentWrong, error);
  }
};

module.exports = updateVenueValidation;
