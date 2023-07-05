const { default: mongoose } = require("mongoose");
const responseMessages = require("../helpers/responseMessages");
const Venue = require("../models/Venue");

const createVenue = async venueDetails => {
  try {
    let venue = await Venue.find({ address: venueDetails.address });

    const doesVenueAlreadyExists = Boolean(venue.length);

    if (doesVenueAlreadyExists) {
      return { success: false, message: responseMessages.venue.create.alreadyExists };
    }

    venue = await Venue.create(venueDetails);

    return { success: true, message: responseMessages.venue.create.success, data: { venue } };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

const getVenues = async (keyword, pageSize = 10, pageNum = 1) => {
  try {
    const searchOptions = keyword ? { address: { $regex: keyword, $options: "i" } } : {};

    const skipCount = pageSize * (pageNum - 1);
    const limitCount = pageSize;

    const venues = await Venue.find(searchOptions).skip(skipCount).limit(limitCount);

    const totalCount = await Venue.count();

    return {
      success: true,
      message: responseMessages.venue.fetch.success,
      data: {
        venues,
        pagination: {
          pageSize,
          pageNum,
          totalCount
        }
      }
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

const getSingleVenue = async venueId => {
  try {
    let venue = await Venue.findOne({ _id: venueId });

    if (venue) {
      return { success: true, message: responseMessages.venue.fetch.success, data: { venue } };
    }

    return { success: false, message: responseMessages.venue.fetch.doesNotExists };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

const updateVenue = async (venueId, venueDetails) => {
  try {
    let venue = await Venue.findOne({ _id: venueId });

    if (venue) {
      venue = await Venue.updateOne({ _id: venueId }, venueDetails);

      return { success: true, message: responseMessages.venue.update.success, data: { venue } };
    }

    return { success: false, message: responseMessages.venue.update.doesNotExists };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

const deleteVenue = async venueId => {
  try {
    const venue = await Venue.findOne({ _id: venueId });

    if (venue) {
      await Venue.deleteOne({ _id: venueId });

      return { success: true, message: responseMessages.venue.delete.success };
    }

    return { success: false, message: responseMessages.venue.delete.doesNotExists };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

module.exports = { createVenue, getVenues, getSingleVenue, updateVenue, deleteVenue };
