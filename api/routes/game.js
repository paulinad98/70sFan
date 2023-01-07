const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const gameController = require("../controllers/game");

router.post("/", auth, gameController.postGame);

router.get("/", auth, gameController.getGames);

module.exports = router;
