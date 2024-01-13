const express = require("express");
const debug = require("debug")("app:server");
const cors = require("cors");
const morgan = require("morgan");

const { Config } = require("./src/config");
const { Database } = require("./src/database");
const { AdminsAPI } = require("./src/admins/routes");
const { UsersAPI } = require("./src/users/routes");
const { EnterpriseAPI } = require("./src/enterprise/routes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

AdminsAPI(app);
UsersAPI(app);
EnterpriseAPI(app);
Database(app);

app.listen(Config.port, () => {
  debug(`[nodemon] listening on port ${Config.port}`);
});