const config = require("../../config/db.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 config.database,
 config.user,
 config.password,
 {
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,

 }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.account = require("./account.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;