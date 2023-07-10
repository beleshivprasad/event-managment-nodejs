const Event = require("../models/Event");

class EventRepository {
  async createEvent(payload) {
    return await Event.create(payload);
  }

  async findEvents(options) {
    return await Event.find(options);
  }

  async findEventById(eventId) {
    return await Event.findById(eventId);
  }

  async totalEventRecords() {
    return await Event.count();
  }

  async getPaginatedEvents(filterOptions, skipCount = 0, limitCount = 10, populateOptions) {
    return await Event.find(filterOptions)
      .skip(skipCount)
      .limit(limitCount)
      .populate(populateOptions);
  }

  async updateEvent(eventId, payload) {
    return await Event.updateOne({ _id: eventId }, payload);
  }

  async deleteEventById(eventID) {
    return await Event.deleteOne({ _id: eventID });
  }
}

module.exports = EventRepository;
