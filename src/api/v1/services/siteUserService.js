const SelfieSiteUserRepository = require("../repositories/selfieSiteUserRepository");
const FestivalSiteUserRepository = require("../repositories/festivalSiteUserRepository");
const BroadwaySiteUserRepository = require("../repositories/broadwaySiteUserRepository");

const selfieSiteUserRepository = new SelfieSiteUserRepository();
const festivalSiteUserRepository = new FestivalSiteUserRepository();
const broadwaySiteUserRepository = new BroadwaySiteUserRepository();

const responseMessages = require("../helpers/responseMessages");

const { BROADWAY_SITE, SELFIE_SITE, FESTIVAL_SITE } = require("../../../config/constants");

const createSiteUser = async (payload, userType) => {
  try {
    const response = await validateRequest(payload, userType);

    if (!response.success) return response;

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

const downloadUsersData = async userType => {
  try {
    const userRepository = getUserRepository(userType);

    const users = await userRepository.fetchUsers({}, getRenamedColumns(userType));

    return {
      success: true,
      message: responseMessages.siteUsers.download.success,
      data: { users }
    };
  } catch (error) {
    return { success: false, message: error.message, error };
  }
};

module.exports = { createSiteUser, fetchSiteUsers, downloadUsersData };

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

// rename columns as per user type for download feature
const getRenamedColumns = userType => {
  const columns = {
    SELFIE_SITE: {
      "First Name": "$firstName",
      "Last Name": "$lastName",
      Email: "$email",
      "Zip Code": "$zipCode",
      "Image Link": "$imageURL",
      "Receive More Info": "$prudentialMarketingAccepted",
      _id: 0
    },
    BROADWAY_SITE: {
      "First Name": "$firstName",
      "Last Name": "$lastName",
      Email: "$email",
      // "Phone Number": "$phoneNumber",
      "Zip Code": "$zipCode",
      "Email Marketing": "$emailMarketingOpted",
      // "Phone Marketing": "$phoneNumberMarketingOpted",
      "Privacy Policy": "$privacyPolicyAccepted",
      _id: 0
    },
    FESTIVAL_SITE: {
      "Device IP Address": "$ip",
      _id: 0
    }
  };

  return columns[userType] || {};
};

// validate request as per user type
const validateRequest = async (userInfo, userType) => {
  switch (userType) {
    case BROADWAY_SITE:
      const userRepository = getUserRepository(userType);

      const user = await userRepository.fetchSingleUser({ email: userInfo.email });
      if (user) {
        return {
          success: false,
          message: responseMessages.siteUsers.fieldValidation.email.alreadyExists
        };
      }

      return { success: true };
    default:
      return { success: true };
  }
};
