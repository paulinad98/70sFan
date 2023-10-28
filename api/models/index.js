import Game from "./game.js";
import Season from "./season.js";
import Team from "./team.js";
import Patreon from "./patreon.js";

Game.belongsTo(Season, { onDelete: "CASCADE" });
Game.belongsTo(Team, { as: "homeTeam", onDelete: "CASCADE" });
Game.belongsTo(Team, { as: "awayTeam", onDelete: "CASCADE" });

export { Game, Season, Team, Patreon };
