const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: String
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  post_serial: {
    type: Number,
  }
});

module.exports = mongoose.model("Post", postSchema);