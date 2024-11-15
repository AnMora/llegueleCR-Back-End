const { Response } = require("../common/response");
const { UsersService } = require("../users/controllers/services");
const Users = require("../users/models");

module.exports.checkAuthRole = (roles) => async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await UsersService.auth(token);
      const userData = await Users.findById(tokenData._id);
        console.log(userData);
      if ([].concat(roles).includes(userData.role)) {
        next();
      } else {
        Response.success(res, 400, `Restricted access`, null);
      }
    } else {
      Response.success(res, 409, `Token required`, token);
    }
  } catch (err) {
    Response.fail(res);
  }
};

// FIJARSE BIEN YA QUE ESTA VALIDANDO EL ROLE CON LA BASE DE DATOS DE LOS USERS, TIENE QUE SER CON LA DE ADMINS
// SOLO ADMINS PUEDEN VER REGISTROS DE CLIENTES
// CAMBIAR CONDICIONES PARA REVISAR POR PERMISO DADO POR UN ADMIN