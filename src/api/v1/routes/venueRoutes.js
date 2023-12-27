const express = require("express");

const router = express.Router();

const venueController = require("../controllers/venueController");

const createVenueValidation = require("../middlewares/validations/createVenueValidation");
const updateVenueValidation = require("../middlewares/validations/updateVenueValidation");

router.get("/", venueController.getVenues);

router.get("/:id", venueController.getSingleVenue);

router.post("/", createVenueValidation, venueController.createVenue);

router.put("/:id", updateVenueValidation, venueController.updateVenue);

router.delete("/:id", venueController.deleteVenue);

module.exports = router;
