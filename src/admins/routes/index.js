const debug = require("debug")("app: module-admin-routes");
const express = require("express");
const cors = require("cors");
const router = express.Router();

const { AdminsController } = require("../controllers");
const { checkAuthAdmin } = require("../../middlewares/checkAuthAdmin");
const { checkAuthRoleAdmin } = require("../../middlewares/checkAuthRoleAdmin");

module.exports.AdminsAPI = (app) => {
  router
    .get("/", checkAuthAdmin, checkAuthRoleAdmin(['delta']), cors(), AdminsController.getAdmins)
    .get("/admin", checkAuthAdmin, cors(), AdminsController.getAdminInfo)
    .get("/:id", cors(), AdminsController.getAdmin)
    .post('/register', cors(), AdminsController.registerAdmin)
    .post('/login', cors(), AdminsController.loginAdmin)
    .put('/:id', cors(), AdminsController.updateAdmin)
    .delete('/:id', AdminsController.deleteAdmin)

  app.use("/lleguele/cr/api/admins", router);
};

// VER SIGUIENTE VIDEO DEPLOY: FRONT -> NETLIFY || BACK -> RENDER
// https://www.youtube.com/watch?v=AjaGmTVBIfI

// VER SIGUIENTE SUBIR IMAGENES CON MULTER Y SHARP
// https://www.youtube.com/watch?v=DahdecVt3cM