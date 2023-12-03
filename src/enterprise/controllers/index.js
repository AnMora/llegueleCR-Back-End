const debug = require("debug")("app:modules-Enterprise-controller");
const createError = require("http-errors");
const { EnterpriseService } = require("./services");
const { Response } = require("../../common/response");

const validateEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

module.exports.EnterpriseController = {
  getEnterprises: async (req, res) => {
    try {
      let Enterprises = await EnterpriseService.getAll();
      Response.success(res, 200, "LLEGUELECR enterprises List", Enterprises);
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  getEnterprise: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let Enterprise = await EnterpriseService.getById(id);
      if (!Enterprise) {
        Response.fail(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR enterprise ${id}`, Enterprise);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  registerEnterprise: async (req, res) => {
    try {
      const { body } = req;
      let { enterprise_email } = body;
      let EnterpriseExists = await EnterpriseService.getByEmail(
        enterprise_email
      );
      if (EnterpriseExists) {
        Response.success(
          res,
          400,
          `Enterprise already exists`,
          EnterpriseExists
        );
      } else if (!validateEmail.test(enterprise_email)) {
        Response.fail(res, new createError.BadRequest());
      } else {
        if (
          Object.keys(body).length === 0 ||
          Object.values(body)[0] === "" ||
          Object.values(body)[4] === "" ||
          Object.values(body)[5] === "" ||
          Object.values(body)[8] === "" ||
          Object.values(body)[11] === "" ||
          Object.values(body)[12] === "" ||
          Object.values(body)[13] === "" ||
          Object.values(body)[14] === "" ||
          Object.values(body) === "" ||
          Object.values(body).length === 0
        ) {
          Response.fail(res, new createError.BadRequest());
        } else {
          const insertedId = await EnterpriseService.register(body);
          Response.success(res, 201, "LLEGUELECR enterprise created", body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  updateEnterprise: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      let { enterprise_email } = body;
      let Enterprise = await EnterpriseService.getById(id);
      if (!Enterprise) {
        Response.fail(res, createError.NotFound());
      } else if (!validateEmail.test(enterprise_email)) {
        Response.fail(res, new createError.BadRequest());
      } else {
        if (
            Object.keys(body).length === 0 ||
            Object.values(body)[0] === "" ||
            Object.values(body)[4] === "" ||
            Object.values(body)[5] === "" ||
            Object.values(body)[8] === "" ||
            Object.values(body)[11] === "" ||
            Object.values(body)[12] === "" ||
            Object.values(body)[13] === "" ||
            Object.values(body)[14] === "" ||
            Object.values(body) === "" ||
            Object.values(body).length === 0
          ) {
          Response.fail(res, new createError.BadRequest());
        } else {
          const updatedId = await EnterpriseService.updateById(id, body);
          Response.success(res, 202, `LLEGUELECR enterprise ${id} updated`, body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  deleteEnterprise: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let Enterprise = await EnterpriseService.deleteById(id);
      if (!Enterprise) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(
          res,
          200,
          `LLEGUELECR enterprise number #${id} deleted`,
          Enterprise
        );
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
};
