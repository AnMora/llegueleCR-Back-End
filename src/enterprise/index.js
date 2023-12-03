const express = require("express");
const { EnterpriseController } = require("./controller");

const router = express.Router();

module.exports.EnterpriseAPI = (app) => {
  router
    .get("/", EnterpriseController.getEnterprises)
    .get("/:id", EnterpriseController.getEnterprise)
    .post("/", EnterpriseController.registerEnterprise)
    .put("/:id", EnterpriseController.updateEnterprise)
    .delete("/:id", EnterpriseController.deleteEnterprise)

  app.use("/lleguele/cr/api/enterprises", router);
};
