const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Game = sequelize.define("game", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: { type: Sequelize.DATE, allowNull: false },
  homeTeamId: { type: Sequelize.INTEGER, allowNull: false },
  awayTeamId: { type: Sequelize.INTEGER, allowNull: false },
  homeTeamScore: { type: Sequelize.INTEGER, allowNull: false },
  awayTeamScore: { type: Sequelize.INTEGER, allowNull: false },
  gameUrl: { type: Sequelize.STRING, allowNull: false },
  basketballReferenceUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: true },
});

module.exports = Game;
