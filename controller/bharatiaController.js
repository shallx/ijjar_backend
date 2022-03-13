const Bharatia = require("../Model/Bharatia");
const faker = require("faker");
const Holding = require("../Model/Holding");



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
      const data = req.body;
      const bharatia = new Bharatia(req.body);
      bharatia.holding = {
        holding_id: mongoose.Types.ObjectId(holding._id),
          serial: req.body.serial,
          type: req.body.type,
          fair: req.body.fair,
          additional_fairs: req.body.additional_fairs
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

// Issue Invoice
exports.addNewInvoice = async (req, res, next) => {
  try {
    const {amount, month, year, type, serial, description} = req.body;
    const invoice = {
      description,
      date: new Date(),
      amount,
      month: new Date(year, month, 1)
    }
    const bharatia = await Bharatia.findOne({"holding.serial": serial, "holding.type": type});
    bharatia.due += parseInt(amount);
    await bharatia.addToInvoices(invoice);
    res.json({message: "Success!!!"});
  }
  catch(error){
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

// Pay dues / add payments,
exports.addNewPayment = async (req, res, next) => {
  try {
    const {amount, month, year, type, serial, description} = req.body;
    const payment = {
      description,
      date: new Date(),
      amount,
      month: new Date(year, month, 1)
    }
    const bharatia = await Bharatia.findOne({"holding.serial": serial, "holding.type": type});
    bharatia.due -= parseInt(amount);
    await bharatia.addToInvoices(payment);
    res.json({message: "Success!!!"});
  }
  catch(error){
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.findActiveBharatia = async(req, res, next) => {
  try{
    const serial = req.query.serial;
    const type = req.query.type;
    const bharatia = await Bharatia.findOne({'holding.serial': serial, 'holding.type': type, active: true});
    res.json(bharatia);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeHolders = async(req, res, next) => {
  const type = req.query.type;
  if(type != null) {
    try {
      const bharatias = await Bharatia.find({active: true, 'holding.type': type}).sort('holding.serial');
      res.json(bharatias);
    }
    catch(error) {
      console.log(error);
      res.json({message: "Some error occured!!!"});
    }
  }
  else {
    try {
      // const bharatias = await Bharatia.find({active: true}).select('holding.serial holding.type').sort('holding.serial');
      const bharatias = await Bharatia.aggregate([
        { $match: { active: true } },
        { $sort : {'holding.serial': 1}},
        {
          $group: {
            _id: '$holding.type',
            bharatias: { 
              // $push: {
              //   _id: '$holding.holding_id',
              //   serial: '$holding.serial',
              //   type: '$holding.type',
              //   fair: '$holding,fair',
              // }
              $push: '$$ROOT'
             }
          }
        },
      ])
      res.json(bharatias);
    }
    catch(error) {
      console.log(error);
      res.json({message: "Some error occured!!!"});
    }
  }
}

exports.activeRoomHolders = async(req, res, next) => {
  try {
    const bharatias = await Bharatia.find({active: true, 'holding.type': 'Room'}).sort('holding.serial');
    res.json(bharatias);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeShopHolders = async (req, res, next) => {
  try {
    const bharatias = await Bharatia.find({active: true, 'holding.type': 'Shop'}).sort('holding.serial');
    res.json(bharatias);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeBlackSmithHolders = async(req, res, next) => {
  try {
    const bharatias = await Bharatia.find({active: true, 'holding.type': 'Blacksmith'}).sort('holding.serial');
    res.json(bharatias);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeDueHolders = async(req, res, next) => {
  try {
    const bharatias = await Bharatia.find({active: true}).where('due').gt(0);
    res.json(bharatias);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}