const express = require("express");
const Router = express.Router();
const expenseController = require("../controller/expenseController");

Router.post("/", expenseController.store);
Router.get("/", expenseController.index);
Router.get("/:_id", expenseController.show);
Router.put("/:_id", expenseController.update);
Router.delete("/:_id", expenseController.destroy);

module.exports = Router;