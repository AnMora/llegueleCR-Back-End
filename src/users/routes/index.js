const debug = require("debug")("app: module-user-routes");
const express = require("express");
const cors = require("cors");
const router = express.Router();

const { UsersController } = require("../controllers");
const { checkAuth } = require("../../middlewares/checkAuth");
const { checkAuthRole } = require("../../middlewares/checkAuthRole");

module.exports.UsersAPI = (app) => {
  router
    // checkAuth, checkAuthRole(['delta']),
    .get("/", checkAuth, checkAuthRole(['delta']), cors(), UsersController.getUsers)
    .get("/user", checkAuth, cors(), UsersController.getUserInfo)
    .get("/:id", cors(), UsersController.getUser)
    .post('/register', cors(), UsersController.registerUser)
    .post('/login', cors(), UsersController.loginUser)
    .put('/:id', cors(), UsersController.updateUser)
    .delete('/:id', UsersController.deleteUser)

  app.use("/lleguele/cr/api/users", router);
};