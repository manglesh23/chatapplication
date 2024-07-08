const express = require("express");
const { userlogin, registerUser } = require("../controller/user");
const { chatbyid } = require("../controller/chat");
const router = express.Router();

router.route("/").get(userlogin);
router.route("/signup").get(registerUser);
router.route("/chatbyid/:id").get(chatbyid);
module.exports = { router };
