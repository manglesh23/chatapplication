const express = require("express");
const http=require('http');
const { connectdatabase } = require("./databaseconnect/databaseconnect");
const { router } = require("./authrouter/authrouter");

require("dotenv").config();
const app = express();

const server = http.createServer(app);      //created the server here
const io = require("socket.io")(server);    

app.use(express.json());
app.use("/", router);

connectdatabase()
  .then(() => {
    server.listen(7000, () => {             //listenning the server here
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
    console.log("A user connected");
  
    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
