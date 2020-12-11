const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const postSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "Anonymous",
  },
  description: {
    type: String,
    default: "Just a post"
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  reaction: [
    {
      name: {
        type: String,
        trim: true,
        default: "Anonymous",
      },
      reaction: {
        type: String,
        enum: ['Like', 'Dislike', 'Angry']
      },
      serial: {
        type: Number,
        trim: true,
      }
    }
  ]
});

module.exports = mongoose.model("Post", postSchema);
