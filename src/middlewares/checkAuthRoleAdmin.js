const { Response } = require("../common/response");
const { AdminsService } = require("../admins/controllers/services");
const Admins = require("../admins/models");

module.exports.checkAuthRoleAdmin = (roles) => async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await AdminsService.auth(token);
      const adminData = await Admins.findById(tokenData._id);
      //   console.log(adminData);
      if ([].concat(roles).includes(adminData.role)) {
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