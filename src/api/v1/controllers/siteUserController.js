const siteUserService = require("../services/siteUserService");

const { errorResponse, successResponse } = require("../helpers/responseHandlers");
const responseMessages = require("../helpers/responseMessages");
const { infoLog, errorLog } = require("../helpers/loggerHelper");
const { UserSearchDetails } = require("../helpers");

const { SELFIE_SITE, FESTIVAL_SITE, BROADWAY_SITE } = require("../../../config/constants");

const createSelfieSiteUser = async (req, res) => await createSiteUser(req, res, SELFIE_SITE);
const fetchSelfieSiteUsers = async (req, res) => await fetchSiteUsers(req, res, SELFIE_SITE);

const createFestivalSiteUser = async (req, res) => await createSiteUser(req, res, FESTIVAL_SITE);
const fetchFestivalSiteUsers = async (req, res) => await fetchSiteUsers(req, res, FESTIVAL_SITE);

const createBroadwaySiteUser = async (req, res) => await createSiteUser(req, res, BROADWAY_SITE);
const fetchBroadwaySiteUsers = async (req, res) => await fetchSiteUsers(req, res, BROADWAY_SITE);

const createSiteUser = async (req, res, userType) => {
  try {
    const userDetails = req.body;

    const response = await siteUserService.createSiteUser(userDetails, userType);

    if (response.success) {
      infoLog(response.message, "createSiteUser", __filename);

      return successResponse(res, response?.message, response.data);
    }

    errorLog(response.message, "createSiteUser", __filename, response?.error || {});

    return errorResponse(res, response?.message, response.error);
  } catch (error) {
    errorLog(error?.message, "createSiteUser", __filename, error);

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

const fetchSiteUsers = async (req, res, userType) => {
  try {
    const { searchKey, pageSize = 10, pageNum = 1 } = req.query;

    const userSearchDetails = new UserSearchDetails(searchKey, pageSize, pageNum, userType);

    const response = await siteUserService.fetchSiteUsers(userSearchDetails);

    if (response.success) {
      infoLog(response.message, "fetchSiteUsers", __filename);

      return successResponse(res, response.message, response.data);
    }

    errorLog(response.message, "fetchSiteUsers", __filename, response?.error || {});

    errorResponse(res, response?.message, response.data);
  } catch (error) {
    errorLog(error?.message, "fetchSiteUsers", __filename, error);

    errorResponse(res, error?.message || responseMessages.event.create.failed, error);
  }
};

module.exports = {
  createSelfieSiteUser,
  createFestivalSiteUser,
  createBroadwaySiteUser,
  fetchSelfieSiteUsers,
  fetchFestivalSiteUsers,
  fetchBroadwaySiteUsers
};
