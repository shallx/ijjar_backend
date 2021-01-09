const User = require("../Model/User");

exports.createUser = (req, res, next) => {
  const user = new User({
    name: "Rafat",
    email: "rafat.rashid@yahoo.com",
  });
  user
    .save()
    .then(res => {
      console.log("Success!!");
    })
    .catch(err => {
      console.log(err);
    });
};

exports.test = (req, res, next) => {
  res.send("<h1>This is an Api</h1>");
};
