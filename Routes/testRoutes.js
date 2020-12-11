const express = require("express");
const Router = express.Router();
const testController = require("../controller/testController");

// Router.post("/", holdingController.create);
Router.get("/generate", testController.generate);
Router.get("/list", testController.list);
// Router.get("/", holdingController.index);
// Router.get("/generate", holdingController.generate);

module.exports = Router;
