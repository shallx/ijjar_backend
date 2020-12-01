const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const holdingSchema = new Schema({
  serial: {
    type: Number,
    required: [true, "Serial is required"],
  },
  type: {
    type: String,
    enum: ["Room", "Shop", "Blacksmith"],
  },
  vacancy: {
    type: Boolean,
    required: [true, "vacancy is required"],
  },
  current_holder: {
    type: Schema.Types.ObjectId,
    ref: "Bharatia",
  },
  base_fair: {
    type: Number,
  },
  current_fair: Number,
});

module.exports = mongoose.model("Holding", holdingSchema);
