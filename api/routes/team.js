const path = require("path");

const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const teamController = require("../controllers/team");

router.post("/", auth, teamController.postTeam);

module.exports = router;
