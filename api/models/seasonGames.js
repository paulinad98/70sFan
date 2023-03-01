const Sequelize = require("sequelize");

const Season = require("./season");
const Game = require("./game");

const sequelize = require("../util/database");

const SeasonGames = sequelize.define("SeasonGames", {
  seasonId: {
    type: Sequelize.INTEGER,
    references: { model: Season, key: "id" },
  },
  gameId: {
    type: Sequelize.INTEGER,
    references: { model: Game, key: "id" },
  },
});

module.exports = SeasonGames;
