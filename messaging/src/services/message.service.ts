import { io } from '../ws/index.js';
import Message from '../models/message.model.js';
import { invalidateCache, setCache } from '../utils/cache.js';

export const sendMessage = async (senderId: string, receiverId: string, content: string) => {
  Message.create({ senderId, receiverId, content });

  io.to(`user:${receiverId}`).emit('receive_message', content);

  invalidateCache(`chat:${senderId}:${receiverId}`);
};

export const findMessages = async (senderId: string, receiverId: string, limit = 20) => {
  const messages = await Message.find({ senderId, receiverId }).sort({ createdAt: -1 }).limit(limit);

  // Asynchronously update the cache
  setCache(`chat:${senderId}:${receiverId}`, messages);
  return messages;
};