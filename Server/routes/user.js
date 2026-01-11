const express = require("express");
const router = express.Router();
const uc = require("../controller/user_controller");

router.post("/signup", uc.signup);
router.post("/login", uc.login);

module.exports = router;
