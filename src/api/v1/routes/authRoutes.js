const express = require("express");

// import controller
const authController = require("../controllers/authController");

// import request validators
const loginValidation = require("../middlewares/validations/loginValidation");
const tokenValidation = require("../middlewares/validations/tokenValidation");

const router = express.Router();

router.post("/login", loginValidation, authController.login);

router.post("/validate_token", tokenValidation, authController.validateToken);

module.exports = router;
