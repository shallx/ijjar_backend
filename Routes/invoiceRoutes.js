const express = require("express");
const Router = express.Router();
const invoiceController = require("../controller/invoiceController");

Router.get("/", invoiceController.index);
Router.post("/create", invoiceController.create);
Router.post("/add-payment", invoiceController.addPayment);
Router.get("/reset", invoiceController.reset);
Router.put("/invoice/transactions/:_id", invoiceController.reset);


module.exports = Router;
