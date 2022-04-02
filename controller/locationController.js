const Location = require("../Model/Location");
const mongoose = require("mongoose");

// Create a location
exports.createLocation = async (req, res, next) => {
  errorHandler.throwErrorIfEmptyBody(req);
  const { location_name, address } = req.body;
  try {
    const location = await Location.create({
      location_name,
      address,
      holdings: [],
    });
    return res.status(201).json({
      success: true,
      message: "Location has been created",
      data: location,
    });
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }
};

// Add a holding to location
exports.addAHolding = async (req, res, next) => {
  errorHandler.throwErrorIfEmptyBody(req);
  const { location_id, type, name, serial, base_fair } = req.body;

  const holding = {
    type,
    name,
    serial,
    base_fair,
  };
  try {
    const location = await Location.findById(location_id);
    location.holdings.push(holding);
    const result = await location.save();
    return res
      .status(201)
      .json({ success: true, message: "Holding has been added", data: result });
  } catch (error) {
    console.log("Caught an error");
    errorHandler.throwErrorc(error, next);
  }
};

exports.experiment = async (req, res, next) => {
  try {
    const result = await Location.findOne({
      holdings: mongoose.Types.ObjectId("622e214f7043995b64ef945c"),
    });
    return res
      .status(200)
      .json({ success: true, message: "Finding a location", data: result });
  } catch (error) {
    errorHandler.throwErrorc(error, next);
  }

  /* // Find with object ID
    try {
      const xx = await Invoice.findOne({
        "tenant.tenant_id": mongoose.Types.ObjectId("5fd4be2ab62ff223a8f22546"),
      });
      return res.status(200).json(xx);
    } catch (error) {
      errorHandler.throwErrorc(error, next);
    } */
};
