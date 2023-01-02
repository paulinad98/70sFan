const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Team = sequelize.define("team", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  logoUrl: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Team;
