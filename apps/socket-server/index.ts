import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins for MVP
        methods: ["GET", "POST"],
    },
});

interface LocationUpdate {
    driverId: string;
    lat: number;
    lng: number;
}

interface ChatMessage {
    bookingId: string;
    senderId: string;
    text: string;
    timestamp: string;
}

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join a booking room for chat
    socket.on("join_booking", (bookingId: string) => {
        socket.join(`booking_${bookingId}`);
        console.log(`Socket ${socket.id} joined booking_${bookingId}`);
    });

    // Handle chat messages
    socket.on("send_message", (data: ChatMessage) => {
        // Broadcast to everyone in the room (including sender)
        io.to(`booking_${data.bookingId}`).emit("new_message", data);
        console.log(`Message sent in booking_${data.bookingId}: ${data.text}`);
    });

    // Handle driver location updates
    socket.on("update_location", (data: LocationUpdate) => {
        // Broadcast to anyone listening for this driver (e.g., mechanic tracking)
        // Could also be room-based: `tracking_${data.driverId}`
        io.emit(`driver_location_${data.driverId}`, data);
        console.log(`Location updated for driver ${data.driverId}`);
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
    console.log(`Socket.io server running on port ${PORT}`);
});
