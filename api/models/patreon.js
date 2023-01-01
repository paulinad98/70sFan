const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Patreon = sequelize.define("patreon", {
  id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Patreon;
