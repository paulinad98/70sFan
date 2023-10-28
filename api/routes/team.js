import path from "path";
import express from "express";

import auth from "../middleware/auth.js";
import teamController from "../controllers/team.js";

const router = express.Router();

router.post("/", auth, teamController.postTeam);
router.get("/", auth, teamController.getTeams);

export default router;
