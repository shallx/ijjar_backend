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
    // type: Schema.Types.ObjectId,
    holding_id:{type: Schema.Types.ObjectId, ref: "Holding",},
    serial: Number,
    type: {
      type: String,
    },
    fair: Number,
    additional_fairs: [
      {
        description: String,
        amount: Number,
      }
    ]
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
        min: [500, "Minimum 500 is required!"]
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      month: {
        // month_id: {
        //   type: Schema.Types.ObjectId,
        //   ref: 'Month',
        // },
        // date: Date,
        type: Date,
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
        // month_id: {
        //   type: Schema.Types.ObjectId,
        //   ref: 'Month',
        // },
        // date: Date,
        type: Date,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  due: {
    type: Number,
    default: 0,
  },
  active_from: Date,
  checked_out: Date,
  active: {
    type: Boolean,
    default: false,
  },
  advance: Number,
  comments: [
    {
      comment: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

// methods
bharatiaSchema.methods.addToInvoices = function(invoice){
  console.log(this.invoices);
  this.invoices.push(invoice);
  return this.save();
}

bharatiaSchema.methods.addToPayments = function(payment){
  this.payments.push(payment);
  return this.save();
}

//Virtuals
bharatiaSchema.virtual('total_fair').get(function(){
  return this.holding.fair + this.additional_fairs.reducer((_sum, _current) => _sum + _current.amount, 0);
})

module.exports = mongoose.model("Bharatia", bharatiaSchema);
