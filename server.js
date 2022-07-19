// @ts-check
const express = require("express");
const cors = require("cors");
const app = express();
const serveIndex = require("serve-index");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const fetch = require("node-fetch");

const state = {};

// "nsp" is the socket namespace. Most single-room
// extensions set this to ${domain}/${room}/${extensionName}.

io.of(/^\/.*$/).on("connection", (socket) => {
  const nsp = socket.nsp.name;
  console.log("a user connected to: ", nsp);
  if (!(nsp in state)) {
    state[nsp] = {};
  }
  state[nsp].clients = socket.nsp.sockets.size;
  // send everybody the state, because the count updated
  socket.nsp.emit("state", state[nsp]);

  socket.on("disconnect", (e) => {
    state[nsp].clients = socket.nsp.sockets.size;
    socket.nsp.emit("state", state[nsp]);
  });

  socket.on("update", (msg) => {
    console.log("update", msg);
    Object.assign(state[nsp], msg);
    socket.nsp.emit("state", state[nsp]);
  });
});

app.use(cors());

// Proxy to Daily API to create rooms for breakout rooms
app.post("/create-rooms", async (req, res) => {
  // Add logic to check if the user is authorized to create a room
  const isAllowed = true;
  if (!isAllowed) {
    return res.status(403).json({
      error: "forbidden",
    });
  }
  const dailyAPIKey = process.env.DAILY_API_KEY || "";
  const Authorization = `Bearer ${dailyAPIKey}`;

  try {
    const headersList = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization,
    };

    // If you'd like to dynamically change the number of rooms
    // created, change how numberOfRooms is set.
    const numberOfRooms = 2;
    const roomRequests = [...Array(numberOfRooms)].map(() => {
      const bodyContent = JSON.stringify({
        properties: {
          // Removes the prejoin UI for breakout rooms,
          // otherwise the prejoin UI will be shown
          // inbetween sessions
          enable_prejoin_ui: false,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // expires in 1 hour
        },
      });
      return fetch("https://api.daily.co/v1/rooms", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });
    });

    const responses = await Promise.all(roomRequests);

    const responseBodies = responses.map((response) => response.json());

    const data = await Promise.all(responseBodies);

    console.log("data:", data);

    const roomUrls = data.map(({ url }) => url);

    return res.status(200).json({ roomUrls });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

app.use("/", serveIndex(__dirname + "/public"));
app.use(express.static(__dirname + "/public"));

server.listen(process.env.PORT, () => {
  console.log("listening on", process.env.PORT);
});
