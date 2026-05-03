const express = require("express");
const router = express.Router();

const userValidate = require("../../../validates/user.validate");

const controller = require("../controllers/user.controller");

router.post("/register", userValidate.registerValidate, controller.register);

router.post("/login", userValidate.loginValidate, controller.login);

router.post(
  "/password/forgot",
  userValidate.forgotPasswordValidate,
  controller.forgotPassword,
);

router.post("/password/otp", userValidate.otpValidate, controller.otpPassword);

router.post(
  "/password/reset",
  userValidate.resetPasswordValidate,
  controller.resetPassword,
);

router.get("/detail", controller.detail);

module.exports = router;
