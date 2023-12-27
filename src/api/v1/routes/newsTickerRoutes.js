const express = require("express");

const router = express.Router();

const newsTickerController = require("../controllers/newsTickerController");

const updateNewsTickerValidation = require("../middlewares/validations/updateNewsTickerValidation");

router.get("/text", newsTickerController.getNewsTickerText);
router.put("/text", updateNewsTickerValidation, newsTickerController.updateNewsTickerText);

module.exports = router;
