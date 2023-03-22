const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_NAME = process.env.DATABASE_NAME;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    dialectModule: mysql2,
  }
);

module.exports = sequelize;
