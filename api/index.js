import "dotenv/config.js";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import sequelize from "./util/database.js";
import { Game, Season, Team, Patreon } from "./models/index.js";
import oauthRoutes from "./routes/oauth.js";
import gameRoutes from "./routes/game.js";
import teamRoutes from "./routes/team.js";
import seasonRoutes from "./routes/season.js";

const { SERVER_PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(multer().single("file"));

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://127.0.0.1:5173",
    "https://70s-fan-front.vercel.app",
    "http://localhost:3000",
    "https://70s-fan-5ahe.vercel.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, x-auth-token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
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
    await sequelize.sync();

    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

export default app;
