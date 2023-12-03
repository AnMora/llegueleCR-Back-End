// Aqui se van a manejar las funciones controladoras de las rutas
const debug = require("debug")("app: module-user-controller");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { UsersService } = require("./services");
const { Response } = require("../common/response");

const validateEmail =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const validatePassword = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Users List", users);
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
        Response.success(res, 200, `User ${id}`, user);
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
      
      let UserExists = await UsersService.getByEmail(email);
      let userExistsIdentifier = await UsersService.getByIdentifier(number_id);
      if (age < 18) {
        Response.success(res, 400, `The user need be +18 `, body);
      } else if (UserExists) {
        Response.success(res, 400, `User already exists`, UserExists);
      } else if (userExistsIdentifier) {
        Response.success(res, 400, `User already exists`, userExistsIdentifier);
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
          Object.values(body) === "" ||
          Object.values(body).length === 0
        ) {
          Response.fail(res, new createError.BadRequest());
        } else {
          const insertedId = await UsersService.register(body);
          Response.success(res, 201, `User created`, body);
        }
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { body, params: {id} } = req;
      const { email, password } = body;
      let UserExists = await UsersService.getByEmail(email);
      if (!UserExists || !bcrypt.compareSync(password, UserExists.password)) {
        Response.success(res, 400, `Invalid Credentials`, body);
      } else {
          const loginId = await UsersService.login(id);
          Response.success(res, 200, `User logged in`, loginId);
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
      let { age, email, number_id, password } = body;
      let user = await UsersService.getById(id);
      let UserExists = await UsersService.getByEmail(email);
      let userExistsIdentifier = await UsersService.getByIdentifier(number_id);
      if (age < 18) {
        Response.success(res, 400, `The user need be +18 `, body);
      } else if (!user) {
        Response.fail(res, createError.NotFound());
      } else if (UserExists) {
        Response.success(res, 400, `User already exists`, UserExists);
      } else if (userExistsIdentifier) {
        Response.success(res, 400, `User already exists`, userExistsIdentifier);
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
          Object.values(body) === "" ||
          Object.values(body).length === 0
        ) {
          Response.fail(res, new createError.BadRequest());
        } else {
          const updatedId = await UsersService.updateById(id, body);
          Response.success(res, 202, `User ${id} updated`, body);
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
        Response.success(res, 200, `User ${id} deleted`, user);
      }
    } catch (err) {
      debug(err);
      Response.fail(res);
    }
  },
};
