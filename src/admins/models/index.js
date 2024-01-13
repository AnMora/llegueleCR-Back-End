const mongoose = require("mongoose");

// module.exports.adminSchema = new Schema({
const adminSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, `The firstname is required`],
    },
    second_name: {
      type: String,
      required: false
    },
    last_name: {
      type: String,
      required: [true, `The lastname is required`],
    },
    age: {
        type: String,
        required: [true, `The age is required, +18`],
    },
    number_id: {
      type: String,
      required: [true, `Your ID Number is required, to check information`],
      unique: true,
    },
    email: {
      type: String,
      required: [true, `The email is required`],
      unique: true,
    },
    password: {
      type: String,
      required: [true, `The password is required`],
    },
    role: {
      type: String,
      default: "delta",
    }
  },
  {
    strict: false,
    // collection: "admins",
    timestamps: true, // Permite los campos de createdAt, updatedAt
    versionKey: false,
  }
);

const AdminsLlegueleCR = mongoose.model("admins", adminSchema);
module.exports = AdminsLlegueleCR