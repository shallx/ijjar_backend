const express = require("express");
const Router = express.Router();
const holdingController = require("../controller/holdingController");

Router.post("/", holdingController.store);
Router.get("/", holdingController.index);
Router.get("/generate", holdingController.generate);
Router.get("/:_id", holdingController.show);
Router.put("/:_id", holdingController.update);
Router.delete("/:_id", holdingController.destroy);

module.exports = Router;
