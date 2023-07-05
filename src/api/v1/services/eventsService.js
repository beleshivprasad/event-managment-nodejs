const responseMessages = require("../helpers/responseMessages");

const Event = require("../models/Event");
const Venue = require("../models/Venue");

const createEvent = async eventDetails => {
  try {
    const startDateTime = getStartDateTime(eventDetails.date, eventDetails.startTime);
    const endDateTime = getEndDateTime(eventDetails.date, eventDetails.endTime);

    // validate event start and end time
    const validateDateTimeResp = validateDateTime(startDateTime, endDateTime);

    if (!validateDateTimeResp.success) {
      return { success: validateDateTimeResp.success, message: validateDateTimeResp.message };
    }

    // validate if event not exists
    const verifyEventNotExistsResp = await verifyEventNotExists(
      eventDetails,
      startDateTime,
      endDateTime
    );

    if (!verifyEventNotExistsResp.success) {
      return {
        success: verifyEventNotExistsResp.success,
        message: verifyEventNotExistsResp.message
      };
    }

    // validate if venue exists for given venue id
    const venueExistsResp = await doesVenueExists(eventDetails.venueID);

    if (!venueExistsResp.success) {
      return { success: venueExistsResp.success, message: venueExistsResp.message };
    }

    // create event
    const createEventPayload = { ...eventDetails, startDateTime, endDateTime };

    const event = await Event.create(createEventPayload);

    return { success: true, message: responseMessages.event.create.success, data: { event } };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const updateEvent = async (eventID, eventDetails) => {
  try {
    let event = await Event.findById(eventID);

    if (!event) {
      return { success: false, message: responseMessages.event.common.doesNotExists };
    }

    let eventDetailsPayload = { ...event.toObject(), ...eventDetails };

    // validate event start and end time
    const startDateTime = getStartDateTime(eventDetailsPayload.date, eventDetailsPayload.startTime);
    const endDateTime = getEndDateTime(eventDetailsPayload.date, eventDetailsPayload.endTime);

    const validateDateTimeResp = validateDateTime(startDateTime, endDateTime);

    if (!validateDateTimeResp.success) {
      return { success: validateDateTimeResp.success, message: validateDateTimeResp.message };
    }

    // validate if event not exists
    const verifyEventNotExistsResp = await verifyEventNotExists(
      eventDetailsPayload,
      startDateTime,
      endDateTime,
      eventID
    );

    if (!verifyEventNotExistsResp.success) {
      return {
        success: verifyEventNotExistsResp.success,
        message: verifyEventNotExistsResp.message
      };
    }

    // validate if venue exists for given venue id
    const venueExistsResp = await doesVenueExists(eventDetailsPayload.venueID);

    if (!venueExistsResp.success) {
      return { success: venueExistsResp.success, message: venueExistsResp.message };
    }

    const updateEventPayload = { ...eventDetailsPayload, startDateTime, endDateTime };

    event = await Event.updateOne({ _id: eventID }, updateEventPayload);

    return { success: true, message: responseMessages.event.update.success, data: { event } };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const getEvents = async (searchKey, pageSize = 10, pageNum = 1) => {
  try {
    const searchOptions = searchKey ? { name: { $regex: searchKey, $options: "i" } } : {};

    const skipCount = pageSize * (pageNum - 1);
    const limitCount = pageSize;

    const events = await Event.find(searchOptions)
      .skip(skipCount)
      .limit(limitCount)
      .populate({ path: "venueID", select: "address", strictPopulate: false });

    const totalCount = await Event.count();

    const eventsWithStatus = await Promise.all(
      events.map(async event => {
        const status = await getEventStatus(event);

        return { ...event.toObject(), status };
      })
    );

    return {
      success: true,
      message: responseMessages.event.fetch.success,
      data: {
        events: eventsWithStatus,
        pagination: {
          pageSize,
          pageNum,
          totalCount
        }
      }
    };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const getSingleEvent = async eventID => {
  try {
    const event = await Event.findById(eventID);

    if (!event) {
      return { success: false, message: responseMessages.event.common.doesNotExists };
    }

    const status = await getEventStatus(event);

    const venue = await Venue.findById(event.venueID);

    return {
      success: true,
      message: responseMessages.event.fetch.success,
      data: {
        event: { ...event.toObject(), status, venueDetails: { ...venue.toObject() } }
      }
    };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const deleteEvent = async eventID => {
  try {
    // validate if event exists
    const event = await Event.findById(eventID);

    if (!event) {
      return { success: false, message: responseMessages.event.common.doesNotExists };
    }

    // validate if event is back dated
    const currentDateTime = new Date();
    const startDateTime = getStartDateTime(event.date, event.startTime);
    const endDateTime = getEndDateTime(event.date, event.endTime);

    if (
      currentDateTime > endDateTime ||
      (currentDateTime >= startDateTime && currentDateTime < endDateTime)
    ) {
      return { success: false, message: responseMessages.event.delete.backDated };
    }

    await Event.deleteOne({ _id: eventID });

    return {
      success: true,
      message: responseMessages.event.delete.success
    };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

// export services
module.exports = { createEvent, getEvents, getSingleEvent, updateEvent, deleteEvent };

// private methods

const getEventStatus = async event => {
  try {
    const startDateTime = getStartDateTime(event.date, event.startTime);
    const endDateTime = getEndDateTime(event.date, event.endTime);

    const currentDateTime = new Date();

    if (currentDateTime >= startDateTime && currentDateTime < endDateTime) {
      await Event.updateOne({ _id: event._id }, { status: "ongoing" });

      return "ongoing";
    }

    return event.status;
  } catch (error) {}
};
const getStartDateTime = (startDate, startTime) => {
  const { year, month, day } = getYearMonthDayForDate(startDate);

  const [startTimeHour, startTimeMiniutes] = startTime.split(":");

  return new Date(year, month, day, startTimeHour, startTimeMiniutes);
};

const getEndDateTime = (endDate, endTime) => {
  const { year, month, day } = getYearMonthDayForDate(endDate);

  const [endTimeHour, endTimeMiniutes] = endTime.split(":");

  return new Date(year, month, day, endTimeHour, endTimeMiniutes);
};

const getYearMonthDayForDate = date => {
  const dateObj = new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth(); // month indexing is starting from 0 i.e 0 => Januaruy
  const day = dateObj.getDate();

  return { year, month, day };
};

const validateDateTime = (startDateTime, endDateTime) => {
  const isEventEndTimeBeforeStartTime = !(endDateTime - startDateTime > 0);
  const currentDateTime = new Date();

  // validate event should not be in back date or elapsed time.
  if (startDateTime < currentDateTime) {
    return {
      success: false,
      message: responseMessages.event.fieldValidation.startTime.alreadyElasped
    };
  }

  if (isEventEndTimeBeforeStartTime) {
    return { success: false, message: responseMessages.event.create.endTimeBeforeStartTime };
  }

  const areEventEndTimeAndStartTimeSame = !(endDateTime - startDateTime) === 0;

  if (areEventEndTimeAndStartTimeSame) {
    return {
      success: false,
      message: responseMessages.event.create.eventEndTimeAndStartTimeSame
    };
  }

  return { success: true };
};

const verifyEventNotExists = async (eventDetails, startDateTime, endDateTime, eventID) => {
  // check if event is alreay exists at same date within range of given start and end time.
  const events = await Event.find({
    name: eventDetails.name,
    date: eventDetails.date,
    venueID: eventDetails.venueID,
    $or: [
      { startDateTime: { $gt: startDateTime, $lt: endDateTime } },
      { startDateTime: { $lt: startDateTime, $gt: endDateTime } },
      { endDateTime: { $gt: startDateTime, $lt: endDateTime } },
      { endDateTime: { $lt: startDateTime, $gt: endDateTime } },
      { startDateTime, endDateTime }
    ]
  });

  const eventIds = events.map(event => event._id.toString()) || [];

  if (events.length === 1 && eventID === eventIds[0]) {
    return { success: true };
  }

  if (events.length) {
    // if already exists return success false with error message.
    return { success: false, message: responseMessages.event.create.timeSlotNotAvailable };
  }

  return { success: true };
};

const doesVenueExists = async venueID => {
  try {
    const venue = await Venue.findOne({ _id: venueID });

    if (!venue) return { success: false, message: responseMessages.venue.fetch.doesNotExists };

    return { success: true, data: { venue } };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};
