const express = require("express");
const createError = require("http-errors");
const { Response } = require("../common/response");

module.exports.IndexAPI = (app) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const menu = {
      admins: `https://${req.headers.host}/api/admins`,
      enterprises: `https://${req.headers.host}/api/enterprises`,
      users: `https://${req.headers.host}/api/users`,
    };

    Response.success(res, 200, `API Enterprises`, menu);
  });

  app.use("/", router);
};

module.exports.NotFoundAPI = (app) => {
  const router = express.Router();

  router.all("*", (req, res) => {
    Response.fail(res, new createError.NotFound());
  });

  app.use("/", router);
};
