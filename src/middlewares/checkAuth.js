const { Response } = require("../common/response");
const { UsersService } = require("../users/controllers/services");

module.exports.checkAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await UsersService.auth(token);
      // console.log(tokenData);
      if (tokenData._id) {
        req.user = tokenData;
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
