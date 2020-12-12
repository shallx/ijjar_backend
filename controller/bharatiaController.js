const Bharatia = require("../Model/Bharatia");
const faker = require("faker");
const Holding = require("../Model/Holding");
const errorHandler = require("./errors");
const mongoose = require('mongoose')

exports.index = (req, res, next) => {
  Bharatia.find()
    // .select({ holding: 1, _id: 0 })
    // .populate({
    //   path: "holding.holding_id",
    // })
    .sort({"holding.serial": 1})
    .exec((err, bharatias) => {
      if (err) {
        error.errorHandle(err, next);
      }
      return res.status(200).json(bharatias);
    });
};

exports.store = (req, res, next) => {

  if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");

  Holding.find({ serial: req.body.serial, type: req.body.type })
    .then(holding => {
      console.log(holding);
      const data = req.body;
      const bharatia = new Bharatia(req.body);
      bharatia.holding = {
        holding_id: mongoose.Types.ObjectId(holding._id),
          serial: req.body.serial
      }
      return bharatia.save();
    })
    .then((bharatia) => {
      return res.status(201).json(bharatia);
    })
    .catch(err => {
      errorHandler.throwErrorc(err, next)
    });
};

exports.show = (req, res, next) => {
  const _id = req.params._id;
  Bharatia.findById(_id)
  .then((bharatia) => {
    return res.json(bharatia);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.update = (req, res, next) => {
  if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");

  const _id = req.params._id;
  Bharatia.findOneAndUpdate({_id}, req.body, {
    new: true
  }).then(bharatia => {
    if(bharatia == null) throw Error('No such Id found');
    return res.status(201).json(bharatia);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.destroy = (req, res, next) => {
  const _id = req.params._id;
  Bharatia.findOneAndDelete({_id})
    .then((result) => {
      if(result == null) throw Error("No such Id found");
      res.status(200).json({message : 'Successfully Deleted!!'})
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};