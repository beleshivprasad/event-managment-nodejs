const express = require("express");
const multer = require("multer");

const selfieController = require("../controllers/selfieController");
const publishImageValidation = require("../middlewares/validations/publishImageValidation");

const upload = multer();
const router = express.Router();

router.post(
  "/publish_to_billboard",
  upload.single("image"),
  publishImageValidation,
  selfieController.publishImageOnBillboard
);

module.exports = router;
