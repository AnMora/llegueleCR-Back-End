const debug = require("debug")("app: module-user-routes");
const express = require("express");
const cors = require("cors");
const router = express.Router();

const { UsersController } = require("../controllers");
const { checkAuth } = require("../../middlewares/checkAuth");
const { checkAuthRole } = require("../../middlewares/checkAuthRole");

module.exports.UsersAPI = (app) => {
  router
    .get("/", checkAuth, checkAuthRole(['delta']), cors(), UsersController.getUsers)
    .get("/user", checkAuth, cors(), UsersController.getUserInfo)
    .get("/:id", cors(), UsersController.getUser)
    .post('/register', cors(), UsersController.registerUser)
    .post('/login', cors(), UsersController.loginUser)
    .put('/:id', cors(), UsersController.updateUser)
    .delete('/:id', UsersController.deleteUser)

  app.use("/lleguele/cr/api/users", router);
};

// VER SIGUIENTE VIDEO DEPLOY: FRONT -> NETLIFY || BACK -> RENDER
// https://www.youtube.com/watch?v=AjaGmTVBIfI

// VER SIGUIENTE SUBIR IMAGENES CON MULTER Y SHARP
// https://www.youtube.com/watch?v=DahdecVt3cM