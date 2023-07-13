const EventRepository = require("../repositories/eventRepository");
const VenueRepository = require("../repositories/venueRepository");

const responseMessages = require("../helpers/responseMessages");
const { DONE, ONGOING } = require("../../../config/constants");

const eventRepository = new EventRepository();
const venueRepository = new VenueRepository();

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

    const event = eventRepository.createEvent(createEventPayload);

    return { success: true, message: responseMessages.event.create.success, data: { event } };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const updateEvent = async (eventID, eventDetails) => {
  try {
    let event = await eventRepository.findEventById(eventID);

    if (!event) {
      return { success: false, message: responseMessages.event.common.doesNotExists };
    }

    let eventDetailsPayload = { ...event.toObject(), ...eventDetails };

    const startDateTime = getStartDateTime(eventDetailsPayload.date, eventDetailsPayload.startTime);
    const endDateTime = getEndDateTime(eventDetailsPayload.date, eventDetailsPayload.endTime);

    // only validate event date and time if they are changed.
    if (shouldValidateEventsTime(event, eventDetails)) {
      // validate event start and end time

      const validateDateTimeResp = validateDateTime(startDateTime, endDateTime, event);

      if (!validateDateTimeResp.success) {
        return { success: validateDateTimeResp.success, message: validateDateTimeResp.message };
      }
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

    event = await eventRepository.updateEvent(eventID, updateEventPayload);

    return { success: true, message: responseMessages.event.update.success, data: { event } };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const getEvents = async (searchKey, pageSize = 10, pageNum = 1) => {
  try {
    const filterOptions = searchKey ? { name: { $regex: searchKey, $options: "i" } } : {};
    const populateOptions = { path: "venueID", select: "address", strictPopulate: false };

    const skipCount = pageSize * (pageNum - 1);
    const limitCount = pageSize;

    const events = await eventRepository.getPaginatedEvents(
      filterOptions,
      skipCount,
      limitCount,
      populateOptions
    );

    const totalCount = await eventRepository.totalEventRecords();

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
    const event = await eventRepository.findEventById(eventID);

    if (!event) {
      return { success: false, message: responseMessages.event.common.doesNotExists };
    }

    const status = await getEventStatus(event);

    const venue = await venueRepository.findVenueById(event.venueID);

    return {
      success: true,
      message: responseMessages.event.fetch.success,
      data: {
        event: { ...event.toObject(), status, venueDetails: venue ? { ...venue.toObject() } : {} }
      }
    };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

const deleteEvent = async eventID => {
  try {
    // validate if event exists
    const event = await eventRepository.findEventById(eventID);

    if (!event) {
      return { success: false, message: responseMessages.event.common.doesNotExists };
    }

    // validate if event is back dated or status is "done"
    const currentDateTime = new Date();
    const startDateTime = getStartDateTime(event.date, event.startTime);
    const endDateTime = getEndDateTime(event.date, event.endTime);

    if (isEventBackDated(currentDateTime, startDateTime, endDateTime, event)) {
      return { success: false, message: responseMessages.event.delete.backDated };
    }

    await eventRepository.deleteEventById(eventID);

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
const isEventDone = event => event.status === DONE;

// check if event start and end time are changed
const shouldValidateEventsTime = (event, eventDetails) => {
  return event.startTime !== eventDetails.startTime || event.endTime !== eventDetails.endTime;
};

const isTimeBetween = (startDateTime, endDateTime, currentDateTime) => {
  return currentDateTime >= startDateTime && currentDateTime < endDateTime;
};

const isEventBackDated = (currentDateTime, startDateTime, endDateTime, event) => {
  return currentDateTime > startDateTime || isEventDone(event);
};

const getEventStatus = async event => {
  const startDateTime = getStartDateTime(event.date, event.startTime);
  const endDateTime = getEndDateTime(event.date, event.endTime);

  const currentDateTime = new Date();

  // set status to "ongoing" if current time is in between event start and end time.
  if (isTimeBetween(startDateTime, endDateTime, currentDateTime)) {
    await eventRepository.updateEvent(event._id, { status: ONGOING });

    return ONGOING;
  }

  // set status to "done" if current time is in between event start and end time.
  if (currentDateTime > endDateTime) {
    await eventRepository.updateEvent(event._id, { status: DONE });

    return DONE;
  }

  return event.status;
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

const validateDateTime = (startDateTime, endDateTime, event) => {
  const isEventEndTimeBeforeStartTime = !(endDateTime - startDateTime > 0);
  const currentDateTime = new Date();

  // validate: event should not be in back date or elapsed time.
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
  const events = await eventRepository.findEvents({
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
    const venue = await venueRepository.findVenueById(venueID);

    if (!venue) return { success: false, message: responseMessages.venue.fetch.doesNotExists };

    return { success: true, data: { venue } };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};
