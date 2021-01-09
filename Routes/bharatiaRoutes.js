const express = require("express");
const Router = express.Router();
const bharatiaController = require("../controller/bharatiaController");

Router.post("/", bharatiaController.store);
Router.get("/", bharatiaController.index);
Router.post("/invoice", bharatiaController.addNewInvoice);
Router.post("/payment", bharatiaController.addNewPayment);
Router.get("/activeholders", bharatiaController.activeHolders);
Router.get("/find", bharatiaController.findActiveBharatia);
Router.get("/:_id", bharatiaController.show);
Router.put("/:_id", bharatiaController.update);
Router.delete("/:_id", bharatiaController.destroy);

module.exports = Router;