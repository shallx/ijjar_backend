const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const commentSchema = new Schema({
  name: {
    type: String,
    default: 'Anyonymous',
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  // post: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Post'
  // }
});

module.exports = mongoose.model("Comment", commentSchema);