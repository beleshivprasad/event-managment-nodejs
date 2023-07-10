const MINIMUM_EVENT_DURATION = 1000 * 60 * 15; // 900000 milliseconds i.e. 15 Min

const ACTIVE = "ACTIVE";
const INACTIVE = "INACTIVE";
const ONGOING = "ONGOING";
const DONE = "DONE";

const EVENT_STATUSES = [ACTIVE, INACTIVE, ONGOING, DONE];

module.exports = { MINIMUM_EVENT_DURATION, ACTIVE, INACTIVE, ONGOING, DONE, EVENT_STATUSES };
