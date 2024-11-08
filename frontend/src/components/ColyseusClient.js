import { Client } from "colyseus.js";

let room = null;

const connectToColyseus = async () => {
  try {
    const client = new Client("ws://localhost:3001"); // Backend server address
    room = await client.joinOrCreate("game_room");
    console.log("Connected to room:", room.id);

    // Handle WebSocket connection errors
    room.onError.add((err) => {
      console.error("WebSocket error:", err);
      // You can add reconnection logic here if needed
    });

    room.onClose.add(() => {
      console.log("WebSocket connection closed, attempting to reconnect...");
      setTimeout(connectToColyseus, 5000); // Retry after 5 seconds
    });
  } catch (error) {
    console.error("Failed to connect to Colyseus server:", error);
  }
};

export default connectToColyseus;
