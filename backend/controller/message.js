const Chat = require("../models/chatName");
const Message = require("../models/messageModel");
const User = require("../models/user");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    res.status(404).json({ msg: "Failed to Send" });
  }

  let newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    // console.log("first:-",message)

    message = await message.populate("sender", "name pic");
    // console.log("second:-",message)

    message = await message.populate("chat");
    // console.log("third:-",message)

    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    // console.log("4th:-",message)

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.status(200).json({ msg: message });
  } catch (e) {
    res.status(500).json({ error: true, details: e.message });
  }
};

const allmessage = async (req, res) => {
  try {
    let message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.status(200).json({ msg: message });
  } catch (e) {
    res.status(500).json({ error: true, details: e.message });
  }
};

module.exports = { sendMessage, allmessage };
