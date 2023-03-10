require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const sequelize = require("./util/database");

const Patreon = require("./models/patreon");
const Team = require("./models/team");
const Game = require("./models/game");
const Season = require("./models/season");
const TeamGames = require("./models/teamGames");
const SeasonGames = require("./models/seasonGames");

const oauthRoutes = require("./routes/oauth");
const gameRoutes = require("./routes/game");
const teamRoutes = require("./routes/team");
const seasonRoutes = require("./routes/season");

const app = express();

app.use(bodyParser.json());
app.use(multer().single("file"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, x-auth-token"
  );
  next();
});

app.get("/", (req, res) => {
  return res.send("Express on Vercel");
});

app.use("/oauth", oauthRoutes);
app.use("/game", gameRoutes);
app.use("/team", teamRoutes);
app.use("/season", seasonRoutes);

const startServer = async () => {
  try {
    Game.belongsToMany(Team, { through: "TeamGames" });
    Team.belongsToMany(Game, { through: "TeamGames" });

    Game.belongsToMany(Season, { through: "SeasonGames" });
    Season.belongsToMany(Game, { through: "SeasonGames" });

    await sequelize.sync();
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

module.exports = app;
