const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
  io.emit("user_connected ", "a user connected");
  socket.broadcast.emit("hi");
  socket.on("disconnect", () => {
    console.log("user disconnected " + socket.id);
  });
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.render("index");
});

app.get("/chat", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.render("chat");
});

app.get("/game", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.render("game");
});

// Socket.io
io.on("connection", async (socket) => {
  console.log("Client connected: ", socket.id);

  const sockets = await io.fetchSockets();
  // Tell new user about previously existing users
  if (sockets.length > 1) {
    socket.emit(
      "user:dump",
      sockets.map((s) => {
        return { id: s.id, username: s.username };
      })
    );
  }

  // Tell everyone else about new user
  socket.on("user:enter", (data) => {
    socket.username = data.username;
    socket.id = data.id;
    socket.broadcast.emit("user:enter", data);
  });

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected: ", socket.id, `(${reason})`);
    socket.broadcast.emit("user:leave", socket.id);
  });

  socket.on("groupMsg:post", (msg) => {
    socket.broadcast.emit("groupMsg:get", msg);
  });

  socket.on("privMsg:post", (id, msg) => {
    // Send message to user with id
    socket.to(id).emit("privMsg:get", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
