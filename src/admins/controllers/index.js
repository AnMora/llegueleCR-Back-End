const debug = require("debug")("app: module-admin-controller");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { AdminsService } = require("./services");
const { Response } = require("../../common/response");

const validateEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const validatePassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

module.exports.AdminsController = {
  getAdmins: async (req, res) => {
    try {
      let admins = await AdminsService.getAll();
      Response.success(res, 200, "LLEGUELECR admins list", admins);
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  getAdmin: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let admin = await AdminsService.getById(id);
      if (!admin) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR admin ${id}`, admin);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  registerAdmin: async (req, res) => {
    try {
      const { body } = req;
      const { age, email, password, number_id } = body;

      let adminExists = await AdminsService.getByEmail(email);
      let adminExistsIdentifier = await AdminsService.getByIdentifier(number_id);
      if (age < 18) {
        Response.success(res, 400, `LLEGUELECR admin need be +18 `, body);
      } else if (adminExists || adminExistsIdentifier) {
        Response.success(res, 400, `LLEGUELECR admins already exists`, null);
      } else if (
        !validateEmail.test(email) ||
        !validatePassword.test(password)
      ) {
        Response.fail(res, new createError.BadRequest());
      } else {
        if (
          Object.keys(body).length === 0 ||
          Object.values(body)[0] === "" ||
          Object.values(body)[2] === "" ||
          Object.values(body)[4] === "" ||
          Object.values(body)[5] === "" ||
          Object.values(body)[6] === "" ||
          Object.values(body) === "" ||
          Object.values(body).length === 0
        ) {
          Response.fail(res, new createError.BadRequest());
        } else {
          const registerId = await AdminsService.register(body);
          Response.success(res, 201, `LLEGUELECR registered admin`, body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  loginAdmin: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const { email, password, number_id } = body;
      let adminExists = await AdminsService.getByEmail(email);
      if (!adminExists || !bcrypt.compareSync(password, adminExists.password) || !bcrypt.compareSync(number_id, adminExists.number_id)) {
        Response.success(res, 400, `Invalid Credentials`, body);
      } else {
        const loginId = await AdminsService.login(adminExists);
        Response.success(res, 200, `LLEGUELECR admin logged in`, loginId);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  getAdminInfo: async (req, res) => {
    try {
      let admin = await AdminsService.getByIdInfo(req.user._id);
      if (!admin) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR admin ${req.user._id}`, admin);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  updateAdmin: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const { age, email, password, number_id } = body;
      // let adminExists = await AdminsService.getByEmail(email);
      let adminExistsIdentifier = await AdminsService.getByIdentifier(number_id);
      if (age < 18) {
        Response.success(res, 400, `LLEGUELECR admin need be +18 `, body);
      } else if (adminExistsIdentifier) {
        Response.success(res, 400, `LLEGUELECR admin already exists`, null);
      } else if (
        !validateEmail.test(email) ||
        !validatePassword.test(password)
      ) {
        Response.fail(res, new createError.BadRequest());
      } else {
        if (
          Object.keys(body).length === 0 ||
          Object.values(body)[0] === "" ||
          Object.values(body)[2] === "" ||
          Object.values(body)[3] === "" ||
          Object.values(body)[4] === "" ||
          Object.values(body)[5] === "" ||
          Object.values(body) === "" ||
          Object.values(body).length === 0
        ) {
          Response.fail(res, new createError.BadRequest());
        } else {
          const updatedId = await AdminsService.updateById(id, body);
          Response.success(res, 202, `LLEGUELECR admin ${id} updated`, body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  deleteAdmin: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let admin = await AdminsService.deleteById(id);
      if (!admin) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR admin ${id} deleted`, admin);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
};
