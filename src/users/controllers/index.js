const debug = require("debug")("app: module-user-controller");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { UsersService } = require("./services");
const { Response } = require("../../common/response");

const validateEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const validatePassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "LLEGUELECR users list", users);
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.getById(id);
      if (!user) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR user ${id}`, user);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  registerUser: async (req, res) => {
    try {
      const { body } = req;
      const { age, email, password, number_id } = body;

      let userExists = await UsersService.getByEmail(email);
      let userExistsIdentifier = await UsersService.getByIdentifier(number_id);
      if (age < 18) {
        Response.success(res, 400, `LLEGUELECR user need be +18 `, body);
      } else if (userExists || userExistsIdentifier) {
        Response.success(res, 400, `LLEGUELECR user already exists`, null);
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
          const registerId = await UsersService.register(body);
          Response.success(res, 201, `LLEGUELECR registered user`, body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  loginUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const { email, password } = body;
      let userExists = await UsersService.getByEmail(email);
      if (!userExists || !bcrypt.compareSync(password, userExists.password)) {
        Response.success(res, 400, `Invalid Credentials`, body);
      } else {
        const loginId = await UsersService.login(userExists);
        Response.success(res, 200, `LLEGUELECR user logged in`, loginId);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  getUserInfo: async (req, res) => {
    try {
      let user = await UsersService.getByIdInfo(req.user._id);
      if (!user) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR user ${req.user._id}`, user);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  updateUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const { age, email, password, number_id } = body;
      // let userExists = await UsersService.getByEmail(email);
      let userExistsIdentifier = await UsersService.getByIdentifier(number_id);
      if (age < 18) {
        Response.success(res, 400, `LLEGUELECR user need be +18 `, body);
      } else if (userExistsIdentifier) {
        Response.success(res, 400, `LLEGUELECR user already exists`, null);
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
          const updatedId = await UsersService.updateById(id, body);
          Response.success(res, 202, `LLEGUELECR user ${id} updated`, body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      let user = await UsersService.deleteById(id);
      if (!user) {
        Response.fail(res, createError.NotFound());
      } else {
        Response.success(res, 200, `LLEGUELECR user ${id} deleted`, user);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
};
