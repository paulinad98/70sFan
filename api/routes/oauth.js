const express = require("express");

const router = express.Router();

const oauthController = require("../controllers/oauth");

router.get("/", oauthController.oauthClient);

module.exports = router;
