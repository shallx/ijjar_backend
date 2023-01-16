const express = require("express");
const Router = express.Router();
const eventController = require("../controller/eventController");

Router.post("/", eventController.store);
Router.get("/", eventController.index);
Router.get("/:_id", eventController.show);
// Router.put("/:_id", eventController.update);
// Router.delete("/:_id", eventController.destroy);

module.exports = Router;