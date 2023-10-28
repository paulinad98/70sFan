import Sequelize from "sequelize";
import sequelize from "../util/database.js";

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

export default Team;
