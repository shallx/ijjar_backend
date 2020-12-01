const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const bharatiaSchema = new Schema({
  name: {
    type: String,
    trim: true,
    default: "Anonymous",
  },
  address: String,
  contact: String,
  holding: {
    type: Schema.Types.ObjectId,
    ref: "Holding",
  },
  invoices: [
    {
      description: {
        type: String,
        default: "Fair",
      },
      amount: {
        type: Number,
        required: [true, "Amount is required"],
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      month: {
        type: Schema.Types.ObjectId,
        ref: "Month",
      },
    },
  ],
  payments: [
    {
      description: {
        type: String,
        default: "Fair",
      },
      amount: {
        type: Number,
        required: [true, "Amount is required"],
      },
      month: {
        type: Schema.Types.ObjectId,
        ref: "Month",
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  active_from: Date,
  checked_out: Date,
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Bharatia", bharatiaSchema);
