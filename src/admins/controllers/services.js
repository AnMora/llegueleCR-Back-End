const { Config } = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminsLlegueleCR = require("../models");

const getAll = async () => {
  const getAdmins = await AdminsLlegueleCR.find({});
  return getAdmins;
};

const getById = async (id) => {
  const getAdmin = await AdminsLlegueleCR.findById(id);
  return getAdmin;
};

const getByEmail = async (email) => {
  const getEmail = await AdminsLlegueleCR.findOne({ email: email });
  return getEmail;
};

const getByIdInfo = async (infoId) => {
  const getAdminInfo = await AdminsLlegueleCR.findById(infoId).select('-password');
  return getAdminInfo;
};

const getByIdentifier = async (number_id) => {
    const getID = await AdminsLlegueleCR.findOne({ number_id: number_id });
    return getID
};

const register = async (admin) => {
  const hashed_password = await bcrypt.hash(admin.password, 16);
  const hashed_identifier = await bcrypt.hash(admin.number_id, 16);
  admin.password = hashed_password;
  admin.number_id = hashed_identifier;
  if (!admin.role) {
    admin.role = "delta";
  }
  let result = await AdminsLlegueleCR.create(admin);
  return result;
};

const login = async (admin) => {
  const filter = { _id: admin.id, role: admin.role };
  // console.log(filter);
  const token = jwt.sign(filter, Config.jwtToken, {
    expiresIn: "1h",
  });
  return { token };
};

const auth = async (token) => {
  return jwt.verify(token, Config.jwtToken);
};

const updateById = async (id, admin) => {
  // const hashed_password = await bcrypt.hash(admin.password, 16);
  // admin.password = hashed_password;
    const filter = id;
    const updateDoc = {
      $set: {
        first_name: admin.first_name,
        second_name: admin.second_name,
        last_name: admin.last_name,
        age: admin.age,
        number_id: admin.number_id,
        // En proximo proyecto integrar agregar imagenes
        email: admin.email,
        password: admin.password,
        role: admin.role,
      },
    };
    let result = await AdminsLlegueleCR.findByIdAndUpdate(filter, updateDoc);
    return result.updatedId;
  };

  const deleteById = async (id) => {
    const deleteadmin = await AdminsLlegueleCR.findByIdAndDelete(id);
    return deleteadmin;
};

// MONTAR PRODUCTS CON EL SCHEMA Y SOLICITUD DE LLEGUELE
// MONTAR TODO ESTO EN LLEGUELE Y APLICAR LAS VALIDACIONES, PRINCIPALMENTE CHECKAUTHROLE!!!!!!!

module.exports.AdminsService = {
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
