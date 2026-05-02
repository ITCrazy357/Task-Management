const express = require("express");
const router = express.Router();

const userValidate = require("../../../validates/user.validate");

const controller = require("../controllers/user.controller");

router.post("/register", userValidate.registerValidate, controller.register);

router.post("/login", userValidate.loginValidate, controller.login);
module.exports = router;
