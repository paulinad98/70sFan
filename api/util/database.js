const Sequelize = require("sequelize");

const databasePassword = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize("70sfan", "root", databasePassword, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
