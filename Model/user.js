const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name fild is required"],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Name fild is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  active: {
    type: Boolean,
    required: [true, "Active field is required"],
  },
});

module.exports = mongoose.model("User", userSchema);