const EnterprisesLlegueleCR = require("../models");

const getAll = async () => {
  const getUsers = await EnterprisesLlegueleCR.find({});
  return getUsers;
};

const getById = async (id) => {
  const getUser = await EnterprisesLlegueleCR.findById(id);
  return getUser;
};

const getByEmail = async (email) => {
  const getEmail = await EnterprisesLlegueleCR.findOne({ email: email });
  return getEmail;
};

const getByIdentifier = async (number_id) => {
  const getID = await EnterprisesLlegueleCR.findOne({ number_id: number_id });
  return getID;
};

const register = async (user) => {
  let register = await EnterprisesLlegueleCR.create(user);
  return register.insertedId;
};

const updateById = async (id, enterprise) => {
  const filter = id;
  const updateDoc = {
    $set: {
      enterprise_name: enterprise.enterprise_name,
      // enterprise_image: enterprise.enterprise_image,
      enterprise_createDay: enterprise.enterprise_createDay,
      enterprise_createMonth: enterprise.enterprise_createMonth,
      enterprise_createYear: enterprise.enterprise_createYear,
      enterprise_description: enterprise.enterprise_description,
      enterprise_email: enterprise.enterprise_email,
      enterprise_facebook: enterprise.enterprise_facebook,
      enterprise_instagram: enterprise.enterprise_instagram,
      enterprise_telephone1: enterprise.enterprise_telephone1,
      enterprise_telephone2: enterprise.enterprise_telephone2,
      enterprise_whatsapp: enterprise.enterprise_whatsapp,
      enterprise_province: enterprise.enterprise_province,
      enterprise_canton: enterprise.enterprise_canton,
      enterprise_zone: enterprise.enterprise_zone,
      enterprise_address: enterprise.enterprise_address,
    },
  };
  let result = await EnterprisesLlegueleCR.findByIdAndUpdate(filter, updateDoc);
  return result.updatedId;
};

const deleteById = async (id) => {
  const deleteUser = await EnterprisesLlegueleCR.findByIdAndDelete(id);
  return deleteUser;
};

module.exports.EnterpriseService = {
  getAll,
  getById,
  getByEmail,
  getByIdentifier,
  register,
  updateById,
  deleteById,
};
