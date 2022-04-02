const Invoice = require("../Model/Invoice");
const Transaction = require("../Model/Transaction");
const errorHandler = require("./errors");
const Location = require("../Model/Location");
const Bharatia = require("../Model/Bharatia");
const mongoose = require("mongoose");

exports.addPayment = async (req, res, next) => {
  errorHandler.throwErrorIfEmptyBody(req);
  const { amount, invoice_id } = req.body;
  const date = new Date();

  try {
    const invoice = await Invoice.findById(invoice_id);
    if (amount > invoice.due) {
      throw new Error("Payment amount is greater than due");
    }

    const trans = await Transaction.create({
      type: 1,
      amount: amount,
      date: date,
      invoice: invoice_id,
    });

    invoice.payments.push({
      date: date,
      amount: amount,
      transaction_id: trans.id,
    });
    const result = await invoice.save();
    return res.status(201).json({
      success: true,
      message: "Transaction has been saved",
      data: {
        invoice: result,
        transaction: trans,
      },
    });
  } catch (err) {
    errorHandler.throwErrorc(err, next);
  }
};

exports.resetInvoice = async (req, res, next) => {
  const _invoice_id = req.params._id;
  Invoice.findById(_invoice_id).then(result => {
    result.due = 2400;
    result.payments = [];
    result.save().then((result) => {
      Transaction.find().then((transactions) => {
        transactions.forEach((transaction) => {
          transaction.remove();
        });
      });

      res.json({
        success: true,
        message: "Invoice has been reset",
        data: result,
      });
    });
  });
};

// Create a location
exports.createLocation = async (req, res, next) => {
  try {
    const location = await Location.create({
      location_name: "Colony",
      address: "Amborkhana, Opposite Polash",
      holdings: [],
    });
    return res.status(201).json({
      success: true,
      message: "Location has been created",
      data: location,
    });
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }
};

// Add a holding to location
exports.addAHolding = async (req, res, next) => {
  errorHandler.throwErrorIfEmptyBody(req);
  const { location_id, type, name, serial, base_fair } = req.body;

  const holding = {
    type,
    name,
    serial,
    base_fair,
  };
  try {
    const location = await Location.findById(location_id);
    location.holdings.push(holding);
    const result = await location.save();
    return res.status(201).json({success: true, message: "Holding has been added", data: result});
  } catch (error) {
    console.log("Caught an error");
    errorHandler.throwErrorc(error, next);
  }
};

exports.index = (req, res, next) => {
  Invoice.find().then((result) => {
    res.status(200).json({success: true, message: "Loaded all invoice", data: result});
  });
};

exports.getAll = (req, res, next) => {
  Invoice.find().then((result) => {
    res.status(200).json({success: true, message: "Loaded all invoice", data: result});
  });
};

exports.createInvoice = async (req, res, next) => {
  errorHandler.throwErrorIfEmptyBody(req);
  const { month, amount, due, breakdown, tenant, payments } = req.body;
  const invoice = new Invoice({
    month: month,
    amount: amount,
    breakdown: breakdown,
    due: due ?? amount,
    tenant,
    payments,
  });
  invoice
    .save()
    .then((result) => {
      return res.status(201).json({
        success: true,
        success_message: "Invoice has been created",
        data: result,
      });
    })
    .catch((err) => errorHandler.throwErrorc(err, next));
};

exports.experiment = async (req, res, next) => {
  try {
    const result = await Location.findOne({
      holdings: mongoose.Types.ObjectId("622e214f7043995b64ef945c"),
    });
    return res.status(200).json({success: true, message: "Finding a location", data: result});
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }

  /* // Find with object ID
  try {
    const xx = await Invoice.findOne({
      "tenant.tenant_id": mongoose.Types.ObjectId("5fd4be2ab62ff223a8f22546"),
    });
    return res.status(200).json(xx);
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  } */
};
