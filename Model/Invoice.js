const mongoose = require("mongoose");
const { Schema } = mongoose;

const invoiceSchema = new Schema({
  month: {
    type: String,
    required: [true, "Month is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  breakdown: [
    {
      description: {
        type: String,
        default: "Fair",
      },
      amount: {
        type: Number,
        required: [true, "Amount is required"],
      },
    },
  ],
  payments: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
        required: [true, "Amount is required"],
      },
      transaction_id: { type: Schema.Types.ObjectId, ref: "Transactions" },
    },
  ],
  due: {
    type: Number,
    required: [true, "Due is required"],
  },
  tenant: {
    tenant_id: { type: Schema.Types.ObjectId, ref: "Bharatia" },
    location_id : { type: Schema.Types.ObjectId, ref: "Location" },
    holding_id : {type: Schema.Types.ObjectId},
    serial: Number,
    name: String,
    type: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
