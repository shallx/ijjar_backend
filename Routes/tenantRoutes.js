const express = require("express");
const Router = express.Router();
const tenantController = require("../controller/tenantController");

Router.post("/", tenantController.store);
Router.get("/", tenantController.index);
Router.post("/invoice", tenantController.addNewInvoice);
Router.post("/payment", tenantController.addNewPayment);
Router.get("/activeholders", tenantController.activeHolders);
Router.get("/activedueholders", tenantController.activeDueHolders);
Router.get("/find", tenantController.findActiveTenant);
Router.get("/:_id", tenantController.show);
Router.put("/:_id", tenantController.update);
Router.delete("/:_id", tenantController.destroy);

module.exports = Router;