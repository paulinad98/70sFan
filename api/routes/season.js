const path = require("path");

const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const seasonController = require("../controllers/season");

router.post("/", auth, seasonController.postSeason);
router.get("/", auth, seasonController.getSeasons);

module.exports = router;
