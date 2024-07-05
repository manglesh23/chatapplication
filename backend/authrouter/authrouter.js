const express = require("express");
const { userlogin, signup } = require("../controller/user");
const router = express.Router();

router.route("/").get(userlogin);
router.route("/signup").get(signup);
module.exports = { router };
