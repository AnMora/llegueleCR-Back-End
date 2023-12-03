const { ObjectId } = require("mongodb");
const { Database } = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Config } = require("../config");
const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) });
};

const getByEmail = async (email) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ email: email });
};

const getByIdentifier = async (number_id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ number_id: number_id });
};

const register = async (user) => {
  const collection = await Database(COLLECTION);
  const hashed_password = await bcrypt.hash(user.password, 16);
  user.password = hashed_password;
  console.log(user.password);
  let result = await collection.insertOne(user);
  return result.insertedId;
};

const login = async (id) => {
  const filter = { _id: new ObjectId(id) }
  const token = jwt.sign(filter, Config.jwtToken, {
    expiresIn: "1h"
  })  
  return {token};
};

const updateById = async (id, user) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      first_name: user.first_name,
      second_name: user.second_name,
      last_name: user.last_name,
      age: user.age,
      // En proximo proyecto integrar agregar imagenes
      email: user.email,
      password: user.password,
      number_id: user.number_id
    },
  };
  let result = await collection.updateOne(filter, updateDoc, options);
  return result.updatedId;
};

const deleteById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.UsersService = {
  getAll, 
  getById,
  getByEmail,
  getByIdentifier,
  register,
  login,
  updateById,
  deleteById,
};
