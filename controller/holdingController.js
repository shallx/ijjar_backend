const Holding = require("../Model/holding");
const Bharatia = require("../Model/bharatia");
const errorHandler = require("./errors");
const faker = require("faker");
exports.create = (req, res, next) => {
  const holding = new Holding(req.body);
  holding
    .save()
    .then(() => {
      return res.status(201).json({ msg: "Success" });
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.index = (req, res, next) => {
  Holding.find()
    .limit(5)
    .then(holdings => {
      console.log(holdings);
      return res.status(200).json(holdings);
    })
    .catch(err => errorHandler.throwErrorc(err, next));
};

exports.show = (req, res, next) => {
  const _id = req.params.id;
  const holding = Holding.findById(_id);
  then(() => {
    return res.json(holding);
  }).catch(err => errorHandler.throwErrorc(err, next));
};

exports.store = (req, res, next) => {};

exports.edit = (req, res, next) => {};

exports.update = (req, res, next) => {};

exports.destroy = (req, res, next) => {};

exports.test = (req, res, next) => {
  res.send("It works");
};

// exports.generate = async (req, res, next) => {

//   for (i = 1; i <= 10; i++) {
//     var holding = new Holding({
//       serial: i,
//       type: "Room",
//       vacancy: faker.random.boolean(),
//       base_fair: faker.random.arrayElement([2200, 2400, 3000, 3500]),
//       current_fair: faker.random.arrayElement([2200, 2400, 3000, 3500]),
//     });
//     try {
//       const result = await holding.save();
//       console.log(i);
//     } catch (error) {
//       console.log(error);
//       errorHandler.throwErrorc(error);
//     }
//   }
//   return res.status(200).json({ message: "success" });
// };
exports.generate = async (req, res, next) => {
  try {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (i = 1; i <= 10; i++) {
      var rand = getRandomInt(0, numbers.length-1);
      var holding = await Holding.findOne({ serial: numbers[rand] });
      numbers.splice(rand, 1);
      var bharatia = new Bharatia({
        name: faker.name.findName() + " " + faker.name.lastName(),
        address: faker.address.streetAddress(),
        contact: faker.phone.phoneNumber(),
        holding: {
          holding_id: holding,
          serial: holding.serial,
        },
        invoices: [],
        payments: [],
        active: faker.random.boolean(),
      });
      const result = await bharatia.save();
    }
  } catch (error) {
    console.log(error);
    errorHandler.throwErrorc(error);
  }
  try {
    var holding = await Holding.findOne({ serial: 7 });
  } catch (error) {
    errorHandler.throwErrorc(error, 500);
  }
  return res.status(200).json({ message: "Generated Successfully" });
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
