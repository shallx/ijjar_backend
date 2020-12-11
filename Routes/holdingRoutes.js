const express = require("express");
const Router = express.Router();
const holdingController = require("../controller/holdingController");

Router.post("/", holdingController.create);
Router.get("/test", holdingController.test);
Router.get("/", holdingController.index);
Router.get("/generate", holdingController.generate);

module.exports = Router;
