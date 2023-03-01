const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Season = sequelize.define("season", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  years: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Season;
