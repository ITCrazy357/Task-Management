const express = require("express");
const router = express.Router();

const userValidate = require("../../../validates/user.validate");

const controller = require("../controllers/user.controller");

router.post("/register", userValidate.registerValidate, controller.register);

module.exports = router;
