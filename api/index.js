require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const Patreon = require("./models/patreon");
const Team = require("./models/team");
const Game = require("./models/game");
const TeamGames = require("./models/teamGames");

const oauthRoutes = require("./routes/oauth");
const gameRoutes = require("./routes/game");
const teamRoutes = require("./routes/team");

const app = express();

app.use(bodyParser.json());

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

const startServer = async () => {
  try {
    Game.belongsToMany(Team, { through: "TeamGames" });
    Team.belongsToMany(Game, { through: "TeamGames" });

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
