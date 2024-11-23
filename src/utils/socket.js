import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.API_URL, {
      transports: ["websocket"], // Use WebSocket for optimized performance
      reconnection: true, // Automatically try to reconnect
      reconnectionAttempts: 5, // Limit reconnection attempts
    });

    // Add listeners for common events
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  return socket;
};
