const mongoose = require("mongoose");

const selfieSiteUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    prudentialMarketingAccepted: {
      type: Boolean,
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
    }
  },
  { timestamps: true }
);

const SelfieSiteUser = mongoose.model("SelfieSiteUser", selfieSiteUserSchema);

module.exports = SelfieSiteUser;
