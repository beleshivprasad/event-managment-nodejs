const mongoose = require("mongoose");

const festivalSiteUserSchema = new mongoose.Schema(
  {
    ip: {
      type: String
    }
  },
  { timestamps: true }
);

const FestivalSiteUser = mongoose.model("FestivalSiteUser", festivalSiteUserSchema);

module.exports = FestivalSiteUser;
