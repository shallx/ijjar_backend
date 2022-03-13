const express = require("express");
const Router = express.Router();
const ijjarController = require("../controller/ijjarController");

Router.get("/", ijjarController.index);
Router.get("/create", ijjarController.create);
Router.get("/all", ijjarController.getAll);
Router.get("/addPayment", ijjarController.addPayment);
Router.get("/reset", ijjarController.resetInvoice);
Router.get("/create-a-location", ijjarController.createLocation);
Router.post("/add-a-holding", ijjarController.addAHolding);

module.exports = Router;
