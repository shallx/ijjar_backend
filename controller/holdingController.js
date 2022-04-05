const Holding = require("../Model/Holding");
const Tenant = require("../Model/Tenant");
const errorHandler = require("./errors");
const faker = require("faker");

exports.index = (req, res, next) => {
  Holding.find()
    .limit(5)
    .then(holdings => {
      console.log(holdings);
      return res.status(200).json(holdings);
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.store = (req, res, next) => {
  // Empty body check
  if(Object.keys(req.body).length === 0 && req.body.constructor === Object) throw Error("Input Fields can't be empty");

  const holding = new Holding(req.body);
  holding
    .save()
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.show = (req, res, next) => {
  const _id = req.params._id;
  Holding.findById(_id)
  .then((holding) => {
    return res.json(holding);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.update = (req, res, next) => {
  const _id = req.params._id;
  console.log(req.body);
  Holding.findOneAndUpdate({_id}, req.body, {
    new: true
  }).then(newHolding => {
    if(newHolding == null) throw Error('No such Id found');
    return res.status(201).json(newHolding);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.destroy = (req, res, next) => {
  const _id = req.params._id;
  Holding.findOneAndDelete({_id})
    .then((result) => {
      if(result == null) throw Error("No such Id found");
      res.status(200).json({message : 'Successfully Deleted!!'})
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.generate = async (req, res, next) => {

  for (i = 1; i <= 10; i++) {
    var holding = new Holding({
      serial: i,
      type: "Shop",
      vacancy: faker.random.boolean(),
      base_fair: faker.random.arrayElement([4500, 5000, 6000]),
      current_fair: faker.random.arrayElement([5000, 4800, 5200, 6200]),
    });
    try {
      const result = await holding.save();
      console.log(i);
    } catch (error) {
      console.log(error);
      errorHandler.throwErrorc(error);
    }
  }
  return res.status(200).json({ message: "success" });
};
// exports.generate = async (req, res, next) => {
//   try {
//     var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//     for (i = 1; i <= 10; i++) {
//       var rand = getRandomInt(0, numbers.length-1);
//       var holding = await Holding.findOne({ serial: numbers[rand] });
//       numbers.splice(rand, 1);
//       var bharatia = new Bharatia({
//         name: faker.name.findName() + " " + faker.name.lastName(),
//         address: faker.address.streetAddress(),
//         contact: faker.phone.phoneNumber(),
//         holding: {
//           holding_id: holding,
//           serial: holding.serial,
//         },
//         invoices: [],
//         payments: [],
//         active: faker.random.boolean(),
//       });
//       const result = await bharatia.save();
//     }
//   } catch (error) {
//     console.log(error);
//     errorHandler.throwErrorc(error);
//   }
//   return res.status(200).json({ message: "Generated Successfully" });
// };

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
