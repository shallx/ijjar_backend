const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");

const expenseSchema = new Schema({
  electric: Number,
  gas: Number,
  cleaner: Number,
  pagla: Number,
  care_taker: Number,
  repairments: Number,
  Other: [
    {
      description: {
        type: String,
        default: "Khoros",
      },
      amount: {
        type: Number,
        required: [true, "Number is required"],
      },
    },
  ],
});

module.exports = mongoose.model("Expense", expenseSchema);
