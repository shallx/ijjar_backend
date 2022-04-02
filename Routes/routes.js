// Route Imports
const bharatiaRoutes = require("./bharatiaRoutes");
const userRoutes = require("./userRoutes");
const holdingRoutes = require("./holdingRoutes");
const testRoutes = require("./testRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const locationRoutes = require("./locationRoutes");
const chalk = require("chalk");
const User = require("../controller/UserController");
// const express = require("express");

exports.routes = app => {
  // Index Route
  app.get("/", (req, res, next) => {
    return res.json({
      message: "This is an api, what are you doing here?",
    });
  });
  app.use("/api", userRoutes);
  app.use("/api/bharatia", bharatiaRoutes);
  app.use("/api/holding", holdingRoutes);
  app.use("/api/invoice", invoiceRoutes);
  app.use("/api/location", locationRoutes);
  app.use("/test", testRoutes);
  app.get("/user", User.createUser);

  // If any error occurs
  app.use((err, req, res, next) => {
    console.log(chalk.red(err));
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const data = err.data;
    res.status(status).json({success: false, message: message, error: data });
  });

  // If route does not exist
  app.use((req, res, next) => {
    res.json({ message: "Page not found" });
  });
};
