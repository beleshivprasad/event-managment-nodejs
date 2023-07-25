const BroadwaySiteUser = require("../models/BroadwaySiteUser");

class BroadwaySiteUserRepository {
  async createUser(payload) {
    return await BroadwaySiteUser.create(payload);
  }

  async fetchUsers(filterOptions, columns) {
    return await BroadwaySiteUser.find(filterOptions, columns);
  }

  async fetchPaginatedUsers(filterOptions, skipCount, limitCount, columns) {
    return await BroadwaySiteUser.find(filterOptions, columns).skip(skipCount).limit(limitCount);
  }

  async fetchTotalUserCount() {
    return await BroadwaySiteUser.find().count();
  }
}

module.exports = BroadwaySiteUserRepository;
