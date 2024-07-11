const express = require("express");
const { userlogin, registerUser, getalluser } = require("../controller/user");
const { chatbyid } = require("../controller/chat");
const { protect } = require("../middleware/authverification");
const router = express.Router();

// router.route("/").get(userlogin);
router.route("/signup").post(registerUser);
router.route("/login").get(userlogin);
router.route("/user").get(protect,getalluser);
router.route("/chatbyid/:id").get(chatbyid);
module.exports = { router };
