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
module.exports = { chataccess, chatbyid };
