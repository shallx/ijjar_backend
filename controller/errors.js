const chalk = require("chalk");

// Throw error if body is empty
exports.throwErrorIfEmptyBody = (req) => {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    const error = new Error("Input Fields can't be empty");
    throw error;
  }
}

//Error to pass in Catchblock
exports.throw500c = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

exports.throw500 = err => {
  const error = new Error(err || "Internal Server Error");
  error.statusCode = 500;
  throw error;
};

exports.throw401 = err => {
  const error = new Error(err || "Not authenticated.");
  error.statusCode = 401;
  throw error;
};

exports.throw403 = err => {
  const error = new Error(err || "Not authorized.");
  error.statusCode = 403;
  throw error;
};

exports.throwError = (err, status, errorData) => {
  const error = new Error(err || "Internal Server Error");
  error.statusCode = status || 500;
  if (errorData) error.data = errorData;
  throw error;
};

//Error to pass in Catch Block
exports.throwErrorc = (err, next, status) => {
  const error = new Error(err || "Some Error Occured");
  error.statusCode = status || 520;
  next(error);
};

exports.throw404 = err => {
  const error = new Error(err || "Page not Found");
  error.statusCode = 404;
  throw error;
};
