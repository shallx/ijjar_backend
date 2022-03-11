const Expense = require("../Model/Expense");
const errorHandler = require("./errors");

exports.index = (req, res, next) => {
  Expense.find()
    .limit(5)
    .then(expenses => {
      return res.status(200).json(expenses);
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.store = (req, res, next) => {
  // Empty body check
  if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");

  const expense = new Expense(req.body);
  expense
    .save()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.show = (req, res, next) => {
  const _id = req.params._id;
  Expense.findById(_id)
  .then((expense) => {
    return res.json(expense);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.update = (req, res, next) => {
  const _id = req.params._id;
  Expense.findOneAndUpdate({_id}, req.body, {
    new: true
  }).then(expense => {
    if(expense == null) throw Error('No such Id found');
    return res.status(201).json(expense);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.destroy = (req, res, next) => {
  const _id = req.params._id;
  Expense.findOneAndDelete({_id})
    .then((result) => {
      if(result == null) throw Error("No such Id found");
      res.status(200).json({message : 'Successfully Deleted!!'})
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};