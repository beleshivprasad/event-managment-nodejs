const express = require("express");

// import controller
const usersController = require("../controllers/usersController");

// import request validators
const createUserValidation = require("../middlewares/validations/createUserValidation");

const router = express.Router();

// base route /api/v1/users

router.post("/", createUserValidation, usersController.createUser);

module.exports = router;
