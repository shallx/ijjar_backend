const Invoice = require("../Model/Invoice");
const Transaction = require("../Model/Transaction");
const errorHandler = require("./errors");

exports.index = async (req, res, next) => {
  try {
    const result = await Invoice.find();
    res
      .status(200)
      .json({ success: true, message: "Loaded all invoice", data: result });
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }
};

exports.create = async (req, res, next) => {
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

exports.reset = async (req, res, next) => {
  const _invoice_id = req.params._id;
  Invoice.findById(_invoice_id).then((result) => {
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

exports.destroy = (req, res, next) => {
    const _id = req.params._id;
    Invoice.findOneAndDelete({_id})
      .then((result) => {
        if(result == null) throw Error("No such Id found");
        res.status(200).json({success: true ,message : 'Successfully Deleted!!', data: result})
      })
      .catch(err => errorHandler.throwErrorc(err, next));
  };
