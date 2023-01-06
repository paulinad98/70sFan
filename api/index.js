require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const Patreon = require("./models/patreon");
const Team = require("./models/team");
const Game = require("./models/game");

const oauthRoutes = require("./routes/oauth");
const gameRoutes = require("./routes/game");
const teamRoutes = require("./routes/team");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Express on Vercel");
});

app.use("/oauth", oauthRoutes);
app.use("/game", gameRoutes);
app.use("/team", teamRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

module.exports = app;
