const mongoose = require("mongoose");

// module.exports.userSchema = new Schema({
const userSchema = new mongoose.Schema(
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
        type: Number,
        required: [true, `The age is required, +18`],
    },
    number_id: {
      type: Number,
      required: [true, `Your ID Number is required, to check information`],
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
      default: "user",
    }
  },
  {
    strict: false,
    collection: "users",
    timestamps: true, // Permite los campos de createdAt, updatedAt
    versionKey: false,
  }
);

module.exports = mongoose.model("users", userSchema);