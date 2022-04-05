const Tenant = require("../Model/Tenant");
const faker = require("faker");
const Holding = require("../Model/Holding");



const mongoose = require('mongoose')

exports.index = (req, res, next) => {
  Tenant.find()
    // .select({ holding: 1, _id: 0 })
    // .populate({
    //   path: "holding.holding_id",
    // })
    .sort({"holding.serial": 1})
    .exec((err, tenants) => {
      if (err) {
        error.errorHandle(err, next);
      }
      return res.status(200).json(tenants);
    });
};

exports.store = (req, res, next) => {
  if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");

  Holding.find({ serial: req.body.serial, type: req.body.type })
    .then(holding => {
      const data = req.body;
      const tenant = new Tenant(req.body);
      tenant.holding = {
        holding_id: mongoose.Types.ObjectId(holding._id),
          serial: req.body.serial,
          type: req.body.type,
          fair: req.body.fair,
          additional_fairs: req.body.additional_fairs
      }
      return tenant.save();
    })
    .then((tenant) => {
      return res.status(201).json(tenant);
    })
    .catch(err => {
      errorHandler.throwErrorc(err, next)
    });
};

exports.show = (req, res, next) => {
  const _id = req.params._id;
  Tenant.findById(_id)
  .then((tenant) => {
    return res.json(tenant);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.update = (req, res, next) => {
  if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");

  const _id = req.params._id;
  Tenant.findOneAndUpdate({_id}, req.body, {
    new: true
  }).then(tenant => {
    if(tenant == null) throw Error('No such Id found');
    return res.status(201).json(tenant);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.destroy = (req, res, next) => {
  const _id = req.params._id;
  Tenant.findOneAndDelete({_id})
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
    const tenant = await Tenant.findOne({"holding.serial": serial, "holding.type": type});
    tenant.due += parseInt(amount);
    await tenant.addToInvoices(invoice);
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
    const tenant = await Tenant.findOne({"holding.serial": serial, "holding.type": type});
    tenant.due -= parseInt(amount);
    await tenant.addToInvoices(payment);
    res.json({message: "Success!!!"});
  }
  catch(error){
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.findActiveTenant = async(req, res, next) => {
  try{
    const serial = req.query.serial;
    const type = req.query.type;
    const tenant = await Tenant.findOne({'holding.serial': serial, 'holding.type': type, active: true});
    res.json(tenant);
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
      const tenants = await Tenant.find({active: true, 'holding.type': type}).sort('holding.serial');
      res.json(tenants);
    }
    catch(error) {
      console.log(error);
      res.json({message: "Some error occured!!!"});
    }
  }
  else {
    try {
      // const tenants = await Tenant.find({active: true}).select('holding.serial holding.type').sort('holding.serial');
      const tenants = await Tenant.aggregate([
        { $match: { active: true } },
        { $sort : {'holding.serial': 1}},
        {
          $group: {
            _id: '$holding.type',
            tenants: { 
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
      res.json(tenants);
    }
    catch(error) {
      console.log(error);
      res.json({message: "Some error occured!!!"});
    }
  }
}

exports.activeRoomHolders = async(req, res, next) => {
  try {
    const tenants = await Tenant.find({active: true, 'holding.type': 'Room'}).sort('holding.serial');
    res.json(tenants);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeShopHolders = async (req, res, next) => {
  try {
    const tenants = await Tenant.find({active: true, 'holding.type': 'Shop'}).sort('holding.serial');
    res.json(tenants);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeBlackSmithHolders = async(req, res, next) => {
  try {
    const tenants = await Tenant.find({active: true, 'holding.type': 'Blacksmith'}).sort('holding.serial');
    res.json(tenants);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}

exports.activeDueHolders = async(req, res, next) => {
  try {
    const tenants = await Tenant.find({active: true}).where('due').gt(0);
    res.json(tenants);
  }
  catch(error) {
    console.log(error);
    res.json({message: "Some error occured!!!"});
  }
}