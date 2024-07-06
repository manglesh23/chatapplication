const express = require("express");
const { userlogin, signup } = require("../controller/user");
const { chatbyid } = require("../controller/chat");
const router = express.Router();

router.route("/").get(userlogin);
router.route("/signup").get(signup);
router.route("/chatbyid/:id").get(chatbyid);
module.exports = { router };
