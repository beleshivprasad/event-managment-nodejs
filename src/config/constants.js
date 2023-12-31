const path = require("path");

const MINIMUM_EVENT_DURATION = 1000 * 60 * 15; // 900000 milliseconds i.e. 15 Min

// event statuses
const ACTIVE = "ACTIVE";
const INACTIVE = "INACTIVE";
const ONGOING = "ONGOING";
const DONE = "DONE";

const EVENT_STATUSES = [ACTIVE, INACTIVE, ONGOING, DONE];
const NON_EDITABLE_STATUS = [ONGOING, DONE];

// types of user as per sites
const SELFIE_SITE = "SELFIE_SITE";
const FESTIVAL_SITE = "FESTIVAL_SITE";
const BROADWAY_SITE = "BROADWAY_SITE";

EVENT_FREEZE_TIME = 30; // minutes

const USER_TYPES = [SELFIE_SITE, FESTIVAL_SITE, BROADWAY_SITE];

// different email templates name
const PUBLISH_IMAGE_TO_BILLBOARD = "PUBLISH_IMAGE_TO_BILLBOARD";

// google drive constants
const KEY_FILE_PATH = path.join(__dirname, "./../../credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const DATA_FIELDS = "id,name";
const EVENT_DEFAULT_FLOW = "DEFAULT_FLOW";
const EVENT_BILLBOARD_FLOW = "BILLBOARD_FLOW";

// date / time
const ONE_DAY_TO_MILISECONDS = 60 * 60 * 24 * 1000; // ms

module.exports = {
  MINIMUM_EVENT_DURATION,
  ACTIVE,
  INACTIVE,
  ONGOING,
  DONE,
  EVENT_STATUSES,
  SELFIE_SITE,
  FESTIVAL_SITE,
  BROADWAY_SITE,
  USER_TYPES,
  NON_EDITABLE_STATUS,
  PUBLISH_IMAGE_TO_BILLBOARD,
  KEY_FILE_PATH,
  SCOPES,
  DATA_FIELDS,
  EVENT_FREEZE_TIME,
  EVENT_DEFAULT_FLOW,
  EVENT_BILLBOARD_FLOW,
  ONE_DAY_TO_MILISECONDS
};
