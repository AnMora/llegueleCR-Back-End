const mongoose = require("mongoose");

// module.exports.userSchema = new Schema({
const userSchema = new mongoose.Schema(
  {
    enterprise_name: {
      type: String,
      required: [true, `The enterprise name is required`]
    },
    enterprise_createDay: {
      type: Number,
      required: false,
    },
    enterprise_createMonth: {
      type: Number,
      required: false,
    },
    enterprise_createYear: {
      type: Number,
      required: false,
    },
    enterprise_description: {
      type: String,
      required: [true, `The enterprise description is required`]
    },
    enterprise_email: {
      type: String,
      required: [true, `The email is required`],
      unique: true,
    },
    enterprise_facebook: {
      type: String,
      required: false,
      unique: true,
    },
    enterprise_instagram: {
      type: String,
      required: false,
      unique: true,
    },
    enterprise_telephone1: {
      type: Number,
      required: [true, `The enterprise telephone is required`],
      unique: true,
    },
    enterprise_telephone2: {
      type: Number,
      required: false,
    },
    enterprise_whatsapp: {
      type: Number,
      required: false,
    },
    enterprise_province: {
      type: String,
      required: [true, `The enterprise province is required`]
    },
    enterprise_canton: {
      type: String,
      required: [true, `The enterprise canton is required`]
    },
    enterprise_zone: {
      type: String,
      required: [true, `The enterprise zone is required`]
    },
    enterprise_address: {
      type: String,
      required: [true, `The enterprise address direction is required`],
      unique: true,
    },
    role: {
      type: String,
      default: "delta"
    }
  },
  {
    strict: false,
    // collection: "enterprises",
    timestamps: true, // Permite los campos de createdAt, updatedAt
    versionKey: false,
  }
);

// EnterprisesLlegueleCR
const EnterprisesLlegueleCR = mongoose.model("enterprises", userSchema);
module.exports = EnterprisesLlegueleCR;