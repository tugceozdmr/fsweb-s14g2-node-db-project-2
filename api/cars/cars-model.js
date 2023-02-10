const db = require("../../data//db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where("id", id).first();
};

const create = async (car) => {
  // HOKUS POKUS
  const [id] = await db("cars").insert(car);
  return getById(id);
};

const updateById = async (id, car) => {
  await db("cars").where("id", id).update(car);
  return getById(id);
};

const deleteById = async (id) => {
  await db("cars").where("id", id).delete();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};