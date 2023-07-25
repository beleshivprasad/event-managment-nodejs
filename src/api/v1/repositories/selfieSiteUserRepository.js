const SelfieSiteUser = require("../models/SelfieSiteUser");

class SelfieSiteUserRepository {
  async createUser(payload) {
    return await SelfieSiteUser.create(payload);
  }

  async fetchUsers(filterOptions, columns) {
    return await SelfieSiteUser.find(filterOptions, columns);
  }

  async fetchPaginatedUsers(filterOptions, skipCount, limitCount, columns) {
    return await SelfieSiteUser.find(filterOptions, columns).skip(skipCount).limit(limitCount);
  }

  async fetchTotalUserCount() {
    return await SelfieSiteUser.find().count();
  }
}

module.exports = SelfieSiteUserRepository;
