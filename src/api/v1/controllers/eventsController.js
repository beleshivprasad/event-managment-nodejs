const { successResponse, errorResponse } = require("../helpers/responseHandlers");

const responseMessages = require("../helpers/responseMessages");
const { isValidMongoID } = require("../helpers/dbHelper");

const eventsService = require("../services/eventsService");
const { logger } = require("../../../logger");

const createEvent = async (req, res) => {
  try {
    const eventDetails = req.body;
    const venueID = req.body.venueID;

    if (isValidMongoID(venueID)) {
      const response = await eventsService.createEvent(eventDetails);

      if (response.success) {
        logger.info(response?.message, {
          functionName: "createEvent",
          fileName: __filename
        });

        return successResponse(res, response?.message, response.data);
      }

      logger.error(response?.message, {
        functionName: "createEvent",
        fileName: __filename,
        error: response?.error || {}
      });

      return errorResponse(res, response?.message, response.error);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "createEvent",
      fileName: __filename,
      error: response?.error || {}
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error?.message, {
      functionName: "createEvent",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventDetails = req.body;
    const eventID = req.params.id;
    const venueID = req.body.venueID;

    if (isValidMongoID(eventID) && isValidMongoID(venueID)) {
      const response = await eventsService.updateEvent(eventID, eventDetails);

      if (response.success) {
        logger.info(response?.message, {
          functionName: "updateEvent",
          fileName: __filename
        });

        return successResponse(res, response?.message, response.data);
      }

      logger.error(response?.message, {
        functionName: "updateEvent",
        fileName: __filename,
        error: response?.error || {}
      });

      return errorResponse(res, response?.message, response.error);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "updateEvent",
      fileName: __filename,
      error: response?.error || {}
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error?.message, {
      functionName: "updateEvent",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

const getEvents = async (req, res) => {
  try {
    const searchKey = req.query.searchKey;
    const pageSize = req.query.pageSize;
    const pageNum = req.query.pageNum;
    const date = req.query.date

    const response = await eventsService.getEvents(searchKey, pageSize, pageNum, date);

    if (response.success) {
      logger.info(response?.message, {
        functionName: "getEvents",
        fileName: __filename
      });

      return successResponse(res, response.message, response.data);
    }

    logger.error(response?.message, {
      functionName: "getEvents",
      fileName: __filename,
      error: response?.error || {}
    });

    errorResponse(res, response?.message, response.data);
  } catch (error) {
    logger.error(error?.message, {
      functionName: "getEvents",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const eventID = req.params.id;

    if (isValidMongoID(eventID)) {
      const response = await eventsService.getSingleEvent(eventID);

      if (response.success) {
        logger.info(response.message, {
          functionName: "getSingleEvent",
          fileName: __filename
        });

        return successResponse(res, response.message, response.data);
      }

      logger.error(response.message, {
        functionName: "getSingleEvent",
        fileName: __filename,
        error: response?.error || {}
      });

      return errorResponse(res, response?.message);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "getSingleEvent",
      fileName: __filename,
      error: response?.error || {}
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error.message, {
      functionName: "getSingleEvent",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventID = req.params.id;

    if (isValidMongoID(eventID)) {
      const response = await eventsService.deleteEvent(eventID);

      if (response.success) {
        logger.info(response.message, {
          functionName: "deleteEvent",
          fileName: __filename
        });

        return successResponse(res, response.message, response.data);
      }

      logger.error(response.message, {
        functionName: "deleteEvent",
        fileName: __filename,
        error: response?.error || {}
      });

      return errorResponse(res, response?.message, response.data);
    }

    logger.error(responseMessages.common.invalidMongoID, {
      functionName: "deleteEvent",
      fileName: __filename,
      error: response?.error || {}
    });

    return errorResponse(res, responseMessages.common.invalidMongoID);
  } catch (error) {
    logger.error(error.message, {
      functionName: "deleteEvent",
      fileName: __filename,
      error
    });

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

module.exports = { createEvent, getEvents, updateEvent, getSingleEvent, deleteEvent };
