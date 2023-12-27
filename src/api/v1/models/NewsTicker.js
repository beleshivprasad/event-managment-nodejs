const mongoose = require("mongoose");

const newsTickerSchema = new mongoose.Schema(
  {
    text: {
      type: String
    }
  },
  { timestamps: true }
);

const NewsTicker = mongoose.model("NewsTicker", newsTickerSchema);

module.exports = NewsTicker;
