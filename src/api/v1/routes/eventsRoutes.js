const express = require("express");

const router = express.Router();

const eventsController = require("../controllers/eventsController");
const createEventValidation = require("../middlewares/validations/createEventValidation");
const updateEventValidation = require("../middlewares/validations/updateEventValidation");

router.get("/", eventsController.getEvents);

router.get("/:id", eventsController.getSingleEvent);

router.post("/", createEventValidation, eventsController.createEvent);

router.put("/:id", updateEventValidation, eventsController.updateEvent);

router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
