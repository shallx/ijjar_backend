const mongoose = require("mongoose");
const validator = require("validator");

const locationSchema = new mongoose.Schema({
  location_name: {
    type: String,
    required: [true, "Location name is required"],
  },
  address: String,
  holdings: [
    {
      type: {
        type: String,
        required: [true, "Type is required"],
      },
      serial: {
        type: Number,
      },
      name: String,
      base_fair: Number,
      current_tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
      active: {
        type: Boolean,
        default: false,
      }
    },
  ],
});

module.exports = mongoose.model("Location", locationSchema);
