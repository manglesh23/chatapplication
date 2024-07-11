const { chats } = require("../data/data");
const Chat = require("../models/chatName");

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

    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};
module.exports = { chatbyid };
