const express = require("express");
const Router = express.Router();
const ijjarController = require("../controller/ijjarController");

Router.get("/", ijjarController.index);
Router.post("/create-invoice", ijjarController.createInvoice);
Router.get("/all", ijjarController.getAll);
Router.post("/add-payment", ijjarController.addPayment);
Router.get("/reset", ijjarController.resetInvoice);
Router.get("/create-a-location", ijjarController.createLocation);
Router.post("/add-a-holding", ijjarController.addAHolding);

module.exports = Router;
