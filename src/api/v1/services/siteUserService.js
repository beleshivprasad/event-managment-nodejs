const SelfieSiteUserRepository = require("../repositories/selfieSiteUserRepository");
const FestivalSiteUserRepository = require("../repositories/festivalSiteUserRepository");
const BroadwaySiteUserRepository = require("../repositories/broadwaySiteUserRepository");

const selfieSiteUserRepository = new SelfieSiteUserRepository();
const festivalSiteUserRepository = new FestivalSiteUserRepository();
const broadwaySiteUserRepository = new BroadwaySiteUserRepository();

const responseMessages = require("../helpers/responseMessages");

const createSiteUser = async (payload, userType) => {
  try {
    const userRepository = getUserRepository(userType);

    const user = await userRepository.createUser(payload);

    return {
      success: true,
      message: responseMessages.siteUsers.create.success,
      data: { user }
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

const fetchSiteUsers = async userSearchDetails => {
  try {
    const filterOptions = {
      ...(userSearchDetails.searchKey && {
        name: { $regex: userSearchDetails.searchKey, $options: "i" }
      })
    };

    const skipCount = userSearchDetails.pageSize * (userSearchDetails.pageNum - 1);
    const limitCount = userSearchDetails.pageSize;

    const userRepository = getUserRepository(userSearchDetails.userType);

    const siteUsers = await userRepository.fetchPaginatedUsers(
      filterOptions,
      skipCount,
      limitCount
    );

    const totalCount = await userRepository.fetchTotalUserCount();

    return {
      success: true,
      message: responseMessages.siteUsers.fetch.success,
      data: {
        siteUsers,
        pagination: {
          pageSize: userSearchDetails.pageSize,
          pageNum: userSearchDetails.pageNum,
          totalCount
        }
      }
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

module.exports = { createSiteUser, fetchSiteUsers };

// private methods

// get user repository as per user type
const getUserRepository = userType => {
  const userRepositories = {
    SELFIE_SITE: selfieSiteUserRepository,
    FESTIVAL_SITE: festivalSiteUserRepository,
    BROADWAY_SITE: broadwaySiteUserRepository
  };

  return userRepositories[userType];
};
