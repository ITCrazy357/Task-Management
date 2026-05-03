const express = require("express");
const router = express.Router();
//Validate
const userValidate = require("../validates/user.validate");

//middleware
const authMiddleware = require("../middlewares/auth.middleware");

//Controller
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

router.get("/detail", authMiddleware.requireAuth, controller.detail);

module.exports = router;
