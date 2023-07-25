const mongoose = require("mongoose");

const broadwaySiteUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    emailMarketingOpted: {
      type: Boolean,
      default: false
    },
    phoneNumberMarketingOpted: {
      type: Boolean,
      default: false
    },
    privacyPolicyAccepted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const BroadwaySiteUser = mongoose.model("BroadwaySiteUser", broadwaySiteUserSchema);

module.exports = BroadwaySiteUser;
