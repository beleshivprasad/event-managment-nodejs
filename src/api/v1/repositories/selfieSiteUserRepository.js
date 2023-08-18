const SelfieSiteUser = require("../models/SelfieSiteUser");

class SelfieSiteUserRepository {
  async createUser(payload) {
    return await SelfieSiteUser.create(payload);
  }

  async fetchUsers(filterOptions, columns) {
    return await SelfieSiteUser.find(filterOptions, columns).sort({ createdAt: -1 });
  }

  async fetchPaginatedUsers(filterOptions, skipCount, limitCount, columns) {
    return await SelfieSiteUser.find(filterOptions, columns).sort({ createdAt: -1 }).skip(skipCount).limit(limitCount);
  }

  async fetchTotalUserCount() {
    return await SelfieSiteUser.count();
  }
}

module.exports = SelfieSiteUserRepository;
