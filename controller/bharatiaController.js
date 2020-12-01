const Bharatia = require("../Model/bharatia");
const Holding = require("../Model//holding");
const error = require("./errors");
exports.create = (req, res, next) => {
  Holding.find({ serial: req.serial, type: req.type })
    .then(holding => {
      const bharatia = new Bharatia({
        name: req.name,
        address: req.address,
        contact: req.contact,
        holding: holding._id,
        Invoices: [],
        payments: [],
        active_from: req.active || null,
        checked_out: req.checked_out || null,
        active: req.active,
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
