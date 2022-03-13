const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const transactionSchema = new Schema({
  // Type 1: Payment
  // Type 2: Expense

  type: {
    type: Number,
    required: [true, "Type is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  month: {
    name: String,
    month_id: { type: Schema.Types.ObjectId, ref: "Month" },
  },
  invoice: { type: Schema.Types.ObjectId, ref: "Invoice" },
  //if type is Expense
  // Desciption = [Gas, Electricity]
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
