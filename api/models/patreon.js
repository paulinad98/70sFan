import Sequelize from "sequelize";
import sequelize from "../util/database.js";

const Patreon = sequelize.define("patreon", {
  id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

export default Patreon;
