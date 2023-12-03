const debug = require("debug")("app: module-enterprise-routes");
const express = require("express");
const cors = require("cors");
const router = express.Router();

const { checkAuth } = require("../../middlewares/checkAuth");
const { checkAuthRole } = require("../../middlewares/checkAuthRole");
const { EnterpriseController } = require("../controllers");

module.exports.EnterpriseAPI = (app) => {
  router
    .get("/", checkAuth, checkAuthRole(['delta']), cors(), EnterpriseController.getEnterprises)
    .get("/:id", cors(), EnterpriseController.getEnterprise)
    .post("/", cors(), EnterpriseController.registerEnterprise)
    .put("/:id", cors(), EnterpriseController.updateEnterprise)
    .delete("/:id", cors(), EnterpriseController.deleteEnterprise)

  app.use("/lleguele/cr/api/enterprises", router);
};