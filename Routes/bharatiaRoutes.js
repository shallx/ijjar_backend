const express = require("express");
const Router = express.Router();
const bharatiaController = require("../controller/bharatiaController");

Router.post("/create", bharatiaController.create);
Router.get("/", bharatiaController.index);
Router.get("/test", bharatiaController.test);

module.exports = Router;
