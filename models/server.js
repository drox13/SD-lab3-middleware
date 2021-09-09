const express = require("express");
const cors = require("cors");
const PORT = 8000;

class Server {
  constructor() {
    this.app = express();
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.port = PORT;
    this.middleware();
    this.routes();
    this.sockets();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/", require("../routes/monitor"));
  }

  sockets() {
    this.io.on("connection", (client) => {
      console.log("Client connect!");
      // client.on('event', data => { /* … */ });
      // client.on('disconnect', () => { /* … */ });

      // setInterval(() => {
      //   this.io.emit("send-data-resource", "home test");
      // }, 3000);
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on ! PORT ${this.port}`);
    });
  }
}

module.exports = Server;
