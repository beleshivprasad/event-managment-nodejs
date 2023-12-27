const Venue = require("../models/Venue");

class VenueRepository {
  async findVenueById(VenueId) {
    return await Venue.findById(VenueId);
  }
}

module.exports = VenueRepository;
