import express from "express";

import auth from "../middleware/auth.js";
import oauthController from "../controllers/oauth.js";

const router = express.Router();

router.get("/", oauthController.oauthClient);

router.get("/user", auth, oauthController.getUser);

export default router;
