const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const commentSchema = new Schema({
  user: {
    type: String,
  },
  content: {
    type: String,
  },
  comment_serial: {
    type: Number,
  },
  
});

module.exports = mongoose.model("Comment", commentSchema);