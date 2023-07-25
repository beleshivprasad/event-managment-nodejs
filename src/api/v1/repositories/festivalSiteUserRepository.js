const FestivalSiteUser = require("../models/FestivalSiteUser");

class FestivalSiteUserRepository {
  async createUser(payload) {
    return await FestivalSiteUser.create(payload);
  }

  async fetchUsers(filterOptions, columns) {
    return await FestivalSiteUser.find(filterOptions, columns);
  }

  async fetchPaginatedUsers(filterOptions, skipCount, limitCount, columns) {
    return await FestivalSiteUser.find(filterOptions, columns).skip(skipCount).limit(limitCount);
  }

  async fetchTotalUserCount() {
    return await FestivalSiteUser.find().count();
  }
}

module.exports = FestivalSiteUserRepository;
