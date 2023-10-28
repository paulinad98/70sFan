import Sequelize from "sequelize";
import sequelize from "../util/database.js";

const Game = sequelize.define("game", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  date: { type: Sequelize.DATE, allowNull: false },
  seasonId: { type: Sequelize.INTEGER, allowNull: false },
  homeTeamId: { type: Sequelize.INTEGER, allowNull: false },
  awayTeamId: { type: Sequelize.INTEGER, allowNull: false },
  homeTeamScore: { type: Sequelize.INTEGER, allowNull: false },
  awayTeamScore: { type: Sequelize.INTEGER, allowNull: false },
  gameUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("gameUrl").split(";");
    },
    set(val) {
      this.setDataValue("gameUrl", val.join(";"));
    },
  },
  basketballReferenceUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: true },
  seasonPhase: { type: Sequelize.STRING, allowNull: false },
});

export default Game;
