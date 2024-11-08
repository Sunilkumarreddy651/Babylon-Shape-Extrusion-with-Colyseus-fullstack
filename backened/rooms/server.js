const { Server } = require("colyseus");
const { createServer } = require("http");
const GameRoom = require("./GameRoom"); // Adjusted path for GameRoom

// Create HTTP server
const httpServer = createServer();

// Create Colyseus server
const gameServer = new Server({
    server: httpServer,
});

// Define a Colyseus room
gameServer.define("game_room", GameRoom);

const PORT = 3001;

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
