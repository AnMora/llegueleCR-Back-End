const { Database } = require("../database");
const { ObjectId } = require("mongodb");
const COLLECTION = "enterprises";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const getByEmail = async (email) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ enterprise_email: email });
};

const register = async (enterprise) => {
  const collection = await Database(COLLECTION);
  let result = collection.insertOne(enterprise);
  return result.insertedId;
};

const updateById = async (id, enterprise) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };

  const updateEnterprise = {
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
  // Con Mongoose se maneja esquema (schema), verificar como realizar los cambios despues de terminar el proyecto
  let result = await collection.updateOne(filter, updateEnterprise, options);
  return result.updatedId;
};

const deleteById = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.deleteOne({ _id: new ObjectId(id) });
};

module.exports.EnterpriseService = {
  getAll,
  getById,
  getByEmail,
  register,
  updateById,
  deleteById,
};
