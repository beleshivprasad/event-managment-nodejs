const express = require("express");

const siteUserController = require("../controllers/siteUserController");

const createSelifeSiteUserValidation = require("../middlewares/validations/createSelifeSiteUserValidation");
const createFestivalSiteUserValidation = require("../middlewares/validations/createFestivalSiteUserValidation");
const createBroadwaySiteUserValidation = require("../middlewares/validations/createBroadwaySiteUserValidation");
const downloadUsersValidation = require("../middlewares/validations/downloadUsersValidation");

const router = express.Router();

router.get("/selfie", siteUserController.fetchSelfieSiteUsers);
router.post("/selfie", createSelifeSiteUserValidation, siteUserController.createSelfieSiteUser);

router.get("/festival", siteUserController.fetchFestivalSiteUsers);
router.post(
  "/festival",
  createFestivalSiteUserValidation,
  siteUserController.createFestivalSiteUser
);

router.get("/broadway", siteUserController.fetchBroadwaySiteUsers);
router.post(
  "/broadway",
  createBroadwaySiteUserValidation,
  siteUserController.createBroadwaySiteUser
);

router.post("/download", downloadUsersValidation, siteUserController.downloadUsersData);

module.exports = router;
