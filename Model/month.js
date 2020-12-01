const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const monthSchema = new Schema({
  date: Date,
});

module.exports = mongoose.model("Month", monthSchema);
