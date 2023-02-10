const express = require("express");

const server = express();

// SİHRİNİZİ GÖSTERİN

server.use(express.json());

const carsRouter = require("./cars/cars-router");
server.use("/api/cars", carsRouter);

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
module.exports = server;
