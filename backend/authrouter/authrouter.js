const express = require("express");
const { userlogin, registerUser, getalluser } = require("../controller/user");
const { chatbyid } = require("../controller/chat");
const router = express.Router();

// router.route("/").get(userlogin);
router.route("/signup").post(registerUser).get(getalluser);
router.route("/login").get(userlogin);
// router.route("/user").get(getalluser);
router.route("/chatbyid/:id").get(chatbyid);
module.exports = { router };
