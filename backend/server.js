const express = require("express");
const http = require("http");
const { connectdatabase } = require("./databaseconnect/databaseconnect");
const { router } = require("./authrouter/authrouter");

require("dotenv").config();
const app = express();

const server = http.createServer(app); //created the server here
const io = require("socket.io")(server);

app.use(express.json());
app.use("/", router);

connectdatabase()
  .then(() => {
    server.listen(7000, () => {
      //listenning the server here
      console.log("listening at 7000");
    });
  })
  .catch((e) => {
    return {
      error: true,
      details: e,
    };
  });

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
