const createError = require("http-errors");

module.exports.Response = {
  success: (res, status = 200, message = "Ok", body = {}) => {
    res.status(status).json({ message, body });
  },
  fail: (res, error = null) => {
    const { statusCode, message } = error ? error : new createError.InternalServerError();
    res.status(statusCode).json({ message })
  },
};
