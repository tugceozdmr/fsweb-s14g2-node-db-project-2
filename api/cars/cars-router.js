// HOKUS POKUS
const express = require("express");

const router = express.Router();
const CarModels = require("./cars-model");
const md = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = await CarModels.getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", md.checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (error) {
    next(error);
  }

  //SOLUTION 2
  // try {
  //   const theCar = await CarModels.getById(req.params.id);
  //   res.status(200).json(theCar);
  // } catch (error) {
  //   next(error);
  // }
});

router.post(
  "/",
  md.checkCarPayload,
  md.checkVinNumberUnique,
  md.checkVinNumberValid,
  async (req, res, next) => {
    try {
      const newCar = await CarModels.create(req.body);

      res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  md.checkCarId,
  md.checkCarPayload,
  async (req, res, next) => {
    try {
      const updatedCar = await CarModels.updateById(req.params.id, req.body);
      res.json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", md.checkCarId, async (req, res, next) => {
  try {
    await CarModels.deleteById(req.params.id);
    res.json(req.car);
  } catch (error) {
    next(error);
  }
});
module.exports = router;

