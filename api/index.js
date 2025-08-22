import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Test route
app.get("/", (req, res) => {
  res.send("NebulaChat API is running!");
});

// Example messages array
let messages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("init", messages);

  socket.on("message", (msg) => {
    const newMsg = { id: Date.now(), text: msg };
    messages.push(newMsg);
    io.emit("message", newMsg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
