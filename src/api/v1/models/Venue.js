const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
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
  mapImageURL: {
    type: String,
    required: true
  },
  mapImageFileName: {
    type: String,
    required: true
  },
  mapImageS3BucketName: {
    type: String,
    required: true
  },
  mapImageS3Key: {
    type: String,
    required: true
  }
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;
