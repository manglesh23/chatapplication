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
    chatId: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    res.status(200).json({ msg: message });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

module.exports = { sendMessage };
