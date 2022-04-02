const express = require("express");
const Router = express.Router();
const locationController = require("../controller/locationController");

Router.post("/create", locationController.createLocation);
Router.post("/add-a-holding", locationController.addAHolding);
Router.get("/experiment", locationController.experiment);

module.exports = Router;