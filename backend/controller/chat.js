const { chats } = require("../data/data");
const Chat = require("../models/chatName");
const User = require("../models/user");

const chatbyid = async (req, res) => {
  console.log(req.params.id);
  // console.log(chats)
  const chatforid = chats.filter((item) => item._id == req.params.id);
  console.log(chatforid);
  res.status(200).json({ msg: chatforid });
};

const chataccess = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      res.status(404).json({ msg: "Didn't find User Id" });
    }
    console.log("req.user:-", req.user._id);
    const allchat = await Chat.find({});
    console.log("all chat:-", allchat);

    // if (allchat.length === 0) {
    //   res.send("empty");
    // }

    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    console.log("Chat:-", isChat);

    const populatedChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    console.log("above if");

    if (populatedChat.length > 0) {
      res.send(populatedChat[0]);
    } else {
      try {
        let chatData = {
          chatName: "sender",
          isGroupChat: false,
          users: [req.user._id, userId],
        };
        console.log("inside else");

        let createchat = await Chat.create(chatData);
        let fullchat = await Chat.findOne({ _id: createchat._id }).populate(
          "users",
          "-password"
        );
        console.log("final");
        res.status(200).json({ msg: fullchat });
      } catch (e) {
        return {
          error: true,
          details: e,
        };
      }
    }
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const fetchchat = async (req, res) => {
  try {
    // res.status(200).json({msg:"fetch data"});
    console.log(req.user._id);
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "name email pic")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        console.log("result:-", result);
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic",
        });
        res.send(result);
      });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const createGroupChat = async (req, res) => {
  try {
    // console.log("Req.user:-",req.user);
    if (!req.body.users || !req.body.name) {
      return res.status(400).json({ msg: "please fill the mendatory fields" });
    }
    let users = JSON.parse(req.body.users);
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }
    users.push(req.user);

    let groupchat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
    });
    console.log("chat created",groupchat);
    //  console.log("group id:-",groupchat._id);
    let getfullchat = await Chat.find({ _id: groupchat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

      res.status(200).json({msg:getfullchat});
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};
module.exports = { chataccess, chatbyid, fetchchat, createGroupChat };
