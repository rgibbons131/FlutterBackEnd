const config = require("../../config/db");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 config.DB,
 config.USER,
 config.PASSWORD,
 {
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    dialect: config.dialect,
    operatorsAliases: false,

 }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Account = require("./account.model.js")(sequelize, Sequelize);
module.exports = db;