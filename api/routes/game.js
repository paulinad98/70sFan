import express from "express";

import auth from "../middleware/auth.js";
import gameController from "../controllers/game.js";

const router = express.Router();

router.post("/", auth, gameController.postGame);

router.post("/file", auth, gameController.postGameFile);

router.get("/", auth, gameController.getGames);

router.get(
  "/scores",
  auth,
  gameController.setGameScoresFromBasketballReference
);

export default router;
