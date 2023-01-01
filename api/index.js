require("dotenv").config();
const express = require("express");

const sequelize = require("./util/database");

const Patreon = require("./models/patreon");

const oauthRoutes = require("./routes/oauth");

const app = express();
app.use("/oauth", oauthRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
