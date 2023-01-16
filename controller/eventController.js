const Event = require("../Model/Event");
const errorHandler = require("./errors");


exports.index = (req, res, next) => {
    Event.find()
      .limit(5)
      .then(events => {
        return res.status(200).json(events);
      })
      .catch(err => errorHandler.throwErrorc(err, next));
  };

exports.show = (req, res, next) => {
  const _id = req.params._id;
  Event.findById(_id)
    .then((event) => {
      return res.json(event);
    })
    .catch((err) => errorHandler.throwErrorc(err, next));
};

exports.store = (req, res, next) => {
    // Empty body check
    if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");
  
    const event = new Event(req.body);
    event
      .save()
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch(err => errorHandler.throwErrorc(err, next));
  };
