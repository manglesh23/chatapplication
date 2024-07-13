const express = require("express");
const { userlogin, registerUser, getalluser } = require("../controller/user");
const { chatbyid, chataccess, fetchchat, createGroupChat } = require("../controller/chat");
const { protect } = require("../middleware/authverification");
const router = express.Router();

// router.route("/").get(userlogin);
router.route("/signup").post(registerUser);
router.route("/login").get(userlogin);
router.route("/user").get(protect,getalluser);
router.route("/chatbyid/:id").get(chatbyid);
router.route("/accesschat").post(protect,chataccess);
router.route("/fetchchat").get(protect,fetchchat);
router.route("/creategroupchat").post(protect,createGroupChat);
module.exports = { router };
