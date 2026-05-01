const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");
const taskValidate = require("../../../validates/task.validate");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.post("/create", taskValidate.taskValidate, controller.create);

router.patch("/edit/:id", taskValidate.taskValidate, controller.edit);

module.exports = router;
