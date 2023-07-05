const { default: mongoose } = require("mongoose");

const { successResponse, errorResponse } = require("../helpers/responseHandlers");

const responseMessages = require("../helpers/responseMessages");
const { isValidMongoID } = require("../helpers/dbHelper");

const venueService = require("../services/venueService");

const { logger } = require("../../../logger");

const createVenue = async (req, res) => {
  try {
    const venueDetails = req.body;

    const response = await venueService.createVenue(venueDetails);

    if (response.success) {
      logger.info(response.message, {
        functionName: "createVenue",
        fileName: __filename
      });

      return successResponse(res, response.message, response.data);
    }

    logger.error(response.message, {
      functionName: "createVenue",
      fileName: __filename
    });

    errorResponse(res, response.message, response.error);
  } catch (error) {
    logger.error(error.message, {
      functionName: "createVenue",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message, error);
  }
};

const updateVenue = async (req, res) => {
  try {
    const venueDetails = req.body;
    const venueId = req.params.id;

    if (isValidMongoID(venueId)) {
      const response = await venueService.updateVenue(venueId, venueDetails);

      if (response.success) {
        logger.info(response.message, {
          functionName: "updateVenue",
          fileName: __filename
        });

        return successResponse(res, response.message, response.data);
      }

      logger.error(response.message, {
        functionName: "updateVenue",
        fileName: __filename
      });

      return errorResponse(res, response.message, response.error);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "updateVenue",
      fileName: __filename
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error.message, {
      functionName: "updateVenue",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message, error);
  }
};

const getVenues = async (req, res) => {
  try {
    const searchKey = req.query.searchKey;
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum;

    const response = await venueService.getVenues(searchKey, pageSize, pageNum);

    if (response.success) {
      logger.info(response.message, {
        functionName: "getVenues",
        fileName: __filename
      });

      return successResponse(res, response.message, response.data);
    }

    logger.error(response.message, {
      functionName: "getVenues",
      fileName: __filename
    });

    errorResponse(res, response.message, response.error);
  } catch (error) {
    logger.error(error.message, {
      functionName: "getVenues",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message, error);
  }
};

const getSingleVenue = async (req, res) => {
  try {
    const venueId = req.params.id;

    if (isValidMongoID(venueId)) {
      const response = await venueService.getSingleVenue(venueId);

      if (response.success) {
        logger.info(response.message, {
          functionName: "getSingleVenue",
          fileName: __filename
        });

        return successResponse(res, response.message, response.data);
      }

      logger.error(response.message, {
        functionName: "getSingleVenue",
        fileName: __filename
      });

      return errorResponse(res, response.message, response.error);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "getSingleVenue",
      fileName: __filename
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error.message, {
      functionName: "getSingleVenue",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message, error);
  }
};

const deleteVenue = async (req, res) => {
  try {
    const venueId = req.params.id;

    if (isValidMongoID(venueId)) {
      const response = await venueService.deleteVenue(venueId);

      if (response.success) {
        logger.info(response.message, {
          functionName: "deleteVenue",
          fileName: __filename
        });

        return successResponse(res, response.message);
      }

      logger.error(response.message, {
        functionName: "deleteVenue",
        fileName: __filename
      });

      return errorResponse(res, response.message, response.error);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "deleteVenue",
      fileName: __filename
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error.message, {
      functionName: "deleteVenue",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message, error);
  }
};

module.exports = { createVenue, getVenues, getSingleVenue, updateVenue, deleteVenue };
