// class to hold user search details
class UserSearchDetails {
  constructor(searchKey, pageSize, pageNum, userType) {
    this.searchKey = searchKey;
    this.pageSize = pageSize;
    this.pageNum = pageNum;
    this.userType = userType;
  }
}

module.exports = { UserSearchDetails };
