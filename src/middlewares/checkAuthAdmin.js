const { Response } = require("../common/response");
const { AdminsService } = require("../admins/controllers/services");

module.exports.checkAuthAdmin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await AdminsService.auth(token);
      // console.log(tokenData);
      if (tokenData._id) {
        req.admin = tokenData;
        next();
      } else {
        Response.success(res, 409, `Token required`, token);
      }
    } else {
      Response.success(res, 409, `Token required`, token);
    }
  } catch (err) {
    Response.fail(res);
  }
};
