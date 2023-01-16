const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const EventSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  isFeatured : {
    type: Boolean,
  },

});

module.exports = mongoose.model("Event", EventSchema);