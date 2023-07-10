const mongoose = require("mongoose");

const { EVENT_STATUSES, ACTIVE } = require("../../../config/constants");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: EVENT_STATUSES,
    default: ACTIVE
  },
  imageURL: {
    type: String,
    required: true
  },
  imageFileName: {
    type: String,
    required: true
  },
  imageS3BucketName: {
    type: String,
    required: true
  },
  imageS3Key: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  venueID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
