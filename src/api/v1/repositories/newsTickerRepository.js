const NewsTicker = require("../models/NewsTicker");

class NewsTickerRepository {
  async createNewsTickerRecord(payload) {
    return await NewsTicker.create(payload);
  }

  async getNewsTickerRecord(columns = { text: 1, _id: 1 }) {
    // it will select the columns names from table specified in the object
    return await NewsTicker.findOne({}, columns);
  }

  async updateNewsTickerRecord(payload) {
    return await NewsTicker.updateOne({}, payload);
  }
}

module.exports = NewsTickerRepository;
