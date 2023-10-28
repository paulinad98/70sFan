import path from "path";
import express from "express";

import auth from "../middleware/auth.js";
import seasonController from "../controllers/season.js";

const router = express.Router();

router.post("/", auth, seasonController.postSeason);
router.get("/", auth, seasonController.getSeasons);

export default router;
