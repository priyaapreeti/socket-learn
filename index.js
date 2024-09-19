import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const app = express();
const serve = http.createServer(app);

const io = new Server(serve, {
  cors: { origin: "*", methods: "*" },
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log(socket.id);
  socket.on("sendingName",(data)=>{
    socket.user= data;
  })
  socket.on("disconnet", () => {
    console.log("user disconnected!");
  });

  //recieved from "chatMessage" event
  socket.on("chatMessage", (msg) => {
    let userData={
        user: socket.user,
        message: msg
    }
    console.log("chat msg:", userData);
    io.emit("broadcastMsg",userData); //sends to self and others
    // socket.broadcast.emit("broadcastMsg", msg); // now again sending to fE, except self
  });
});

serve.listen(3000, () => console.log("Listening on 3000"));
