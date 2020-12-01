const express = require("express");
const Router = express.Router();
const userController = require("../controller/UserController");

Router.get("/create", userController.createUser);
Router.get("/test", userController.test);

module.exports = Router;
