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
  socket.on("disconnet", () => {
    console.log("user disconnected!");
  });
  socket.on("chatMessage", (msg) => {
    console.log("chat msg:", msg);
    socket.broadcast.emit("broadcastMsg", msg);
  });
});

serve.listen(3000, () => console.log("Listening on 3000"));
