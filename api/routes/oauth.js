const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const oauthController = require("../controllers/oauth");

router.get("/", oauthController.oauthClient);

router.get("/user", auth, oauthController.getUser);

module.exports = router;
