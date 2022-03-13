const Invoice = require("../Model/Invoice");
const Transaction = require("../Model/Transaction");
const errorHandler = require("./errors");
const Location = require("../Model/Location");
const mongoose = require("mongoose");

exports.addPayment = async (req, res, next) => {
  const amount = 200;
  const date = new Date();
  const invoiceId = "622caed3ebbea83568c40550";

  try {
    const invoice = await Invoice.findById(invoiceId);
    if (amount > invoice.due) {
      throw new Error("Payment amount is greater than due");
    }

    const trans = Transaction.create({
      type: 1,
      amount: amount,
      date: date,
      invoice: invoiceId,
    });

    invoice.payments.push({
      date: date,
      amount: amount,
      transaction_id: trans.id,
    });
    const result = await invoice.save();
    return res.status(201).json({
      success: true,
      success_message: "Transaction has been saved",
      invoice: result,
      trans: trans,
    });
  } catch (err) {
    errorHandler.throwErrorc(err, next);
  }

  /* Invoice.findById(invoiceId)
    .then(result => {
      const originalInvoice = Object.create(result);
      result.due = result.due - amount;
      result.payments.push({
        date: date,
        amount: amount,
      });
      result
        .save()
        .then(invoiceResult => {
          const trans = new Transaction({
            type: 1,
            amount: amount,
            date: date,
            invoice: invoiceId,
          });
          trans
            .save()
            .then(data => {
              throw "fail";
              return res.status(201).json({
                success: true,
                success_message: "Transaction has been saved",
                invoice: invoiceResult,
                trans: data,
              });
            })
            .catch(err => {
              // Transaction will not get recorded yet invoice is updated
              // fit it
              console.log("Jayga moto aise");
              console.log(originalInvoice);
              originalInvoice.save();
              errorHandler.throwErrorc(err, next);
            });
        })
        .catch(err => {
          errorHandler.throwErrorc(err, next);
        });
    })
    .catch(err => {
      errorHandler.throwErrorc(err, next);
    }); */
};

exports.resetInvoice = (req, res, next) => {
  const invoiceId = "622caed3ebbea83568c40550";
  Invoice.findById(invoiceId).then(result => {
    result.due = 2400;
    result.payments = [];
    result.save().then(result => {
      Transaction.find().then(transactions => {
        transactions.forEach(transaction => {
          transaction.remove();
        });
      });

      res.json({
        success: true,
        success_message: "Invoice has been reset",
        invoice: result,
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
      success_message: "Location has been created",
      location: location,
    });
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }
};

// Add a holding to location
exports.addAHolding = (req, res, next) => {
  errorHandler.throwErrorIfEmptyBody(req);
  const { location_id, type, name, serial, base_fair } = req.body;

  const holding = {
    type,
    name,
    serial,
    base_fair,
  };
  try {
    Location.findById(location_id).then(location => {
      location.holdings.push(holding);
      location
        .save()
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          throw error;
        });
    });
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }
};

exports.index = (req, res, next) => {
  Invoice.find().then(result => {
    res.json(result);
  });
};

exports.getAll = (req, res, next) => {
  Invoice.find().then(result => {
    res.json(result);
  });
};

exports.create = (req, res, next) => {
  const invoice = new Invoice({
    month: "January 2022",
    amount: 2400,
    breakdown: [
      {
        description: "Fare",
        amount: 2000,
      },
      {
        description: "Fridge",
        amount: 400,
      },
    ],
    due: 2400,
  });
  invoice
    .save()
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};
