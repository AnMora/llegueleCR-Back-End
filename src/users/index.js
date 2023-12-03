const express = require("express");
const { UsersController } = require("./controller");

const router = express.Router();

module.exports.UsersAPI = (app) => {
  router
    .get("/", UsersController.getUsers)
    .get("/:id", UsersController.getUser)
    .post("/register", UsersController.registerUser)
    .post("/login", UsersController.loginUser)
    .put("/:id", UsersController.updateUser)
    .delete("/:id", UsersController.deleteUser);

  app.use("/lleguele/cr/api/users", router);
};
