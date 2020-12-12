const Bharatia = require("../Model/bharatia");
const Holding = require("../Model//holding");
const error = require("./errors");

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

exports.create = (req, res, next) => {
  Holding.find({ serial: req.serial, type: req.type })
    .then(holding => {
      const data = req.body;
      const bharatia = new Bharatia({
        name: data.name,
        address: data.address,
        contact: data.contact,
        holding: holding._id,
        Invoices: [],
        payments: [],
        active_from: data.active || null,
        checked_out: data.checked_out || null,
        active: data.active,
      });
      return bharatia.save();
    })
    .then(() => {
      return res.status(201);
    })
    .catch(err => error.errorHandle(err, next));
};

exports.test = (req, res, next) => {
  res.send("<h1>This is Bharatia api</h1>");
};
