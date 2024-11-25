import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const io = new Server(parseInt(process.env.SOCKET_PORT));

export const initializeSocket = () => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // auth middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        return next(new Error('Authentication error: No token provided'));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
        socket.data.userId = payload.userId;
        next();
    } catch (err) {
        next(new Error('Authentication error: Invalid token'));
    }
  });

  return io;
};