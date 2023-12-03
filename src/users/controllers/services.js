const { Config } = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UsersLlegueleCR = require("../models");

const getAll = async () => {
  const getUsers = await UsersLlegueleCR.find({});
  return getUsers;
};

const getById = async (id) => {
  const getUser = await UsersLlegueleCR.findById(id);
  return getUser;
};

const getByEmail = async (email) => {
  const getEmail = await UsersLlegueleCR.findOne({ email: email });
  return getEmail;
};

const getByIdInfo = async (infoId) => {
  const getUserInfo = await UsersLlegueleCR.findById(infoId).select('-password');
  return getUserInfo;
};

const getByIdentifier = async (number_id) => {
    const getID = await UsersLlegueleCR.findOne({ number_id: number_id });
    return getID
};

const register = async (user) => {
  const hashed_password = await bcrypt.hash(user.password, 16);
  user.password = hashed_password;
  if (!user.role) {
    user.role = "user";
  }
  let result = await UsersLlegueleCR.create(user);
  return result.insertedId;
};

const login = async (user) => {
  const filter = { _id: user.id, role: user.role };
  // console.log(filter);
  const token = jwt.sign(filter, Config.jwtToken, {
    expiresIn: "1h",
  });
  return { token };
};

const auth = async (token) => {
  return jwt.verify(token, Config.jwtToken);
};

const updateById = async (id, user) => {
  const hashed_password = await bcrypt.hash(user.password, 16);
  user.password = hashed_password;
    const filter = id;
    const updateDoc = {
      $set: {
        first_name: user.first_name,
        second_name: user.second_name,
        last_name: user.last_name,
        age: user.age,
        number_id: user.number_id,
        // En proximo proyecto integrar agregar imagenes
        email: user.email,
        password: user.password,
        role: user.role,
      },
    };
    let result = await UsersLlegueleCR.findByIdAndUpdate(filter, updateDoc);
    return result.updatedId;
  };

  const deleteById = async (id) => {
    const deleteUser = await UsersLlegueleCR.findByIdAndDelete(id);
    return deleteUser;
};

// MONTAR PRODUCTS CON EL SCHEMA Y SOLICITUD DE LLEGUELE
// MONTAR TODO ESTO EN LLEGUELE Y APLICAR LAS VALIDACIONES, PRINCIPALMENTE CHECKAUTHROLE!!!!!!!

module.exports.UsersService = {
  getAll,
  getById,
  getByEmail,
  getByIdentifier,
  register,
  login,
  getByIdInfo,
  auth,
  updateById,
  deleteById
};
