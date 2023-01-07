const Sequelize = require("sequelize");

const Team = require("./team");
const Game = require("./game");

const sequelize = require("../util/database");

const TeamGames = sequelize.define("TeamGames", {
  teamId: {
    type: Sequelize.INTEGER,
    references: { model: Team, key: "id" },
  },
  gameId: {
    type: Sequelize.INTEGER,
    references: { model: Game, key: "id" },
  },
});

module.exports = TeamGames;
