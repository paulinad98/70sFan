import Sequelize from "sequelize";
import sequelize from "../util/database.js";

const Season = sequelize.define("season", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  years: { type: Sequelize.STRING, allowNull: false },
});

export default Season;
