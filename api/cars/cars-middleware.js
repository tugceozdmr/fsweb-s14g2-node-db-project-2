const Cars = require("./cars-model");
const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const car = await Cars.getById(req.params.id);

    if (!car) {
      next({
        status: 404,
        message: `${req.params.id} kimliğine sahip araba bulunumadı`,
      });
    } else {
      req.car = car;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  // HOKUS POKUS
  try {
    const requiredFields = ["vin", "make", "model", "mileage"];
    const missingField = requiredFields.find((field) => !req.body[field]);

    if (missingField) {
      next({
        status: 400,
        message: `${missingField} is missing`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  vinValidator.validate(vin)
    ? next()
    : res.status(400).json({ message: `vin ${vin} is invalid` });
};

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try {
    const present = await db("cars").where("vin", req.body.vin).first();

    if (present) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};