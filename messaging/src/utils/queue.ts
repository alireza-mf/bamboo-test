import Redis from 'ioredis';
import { sendMessage } from '../services/message.service.js';

const redis = new Redis();

export const initializeSubscribers = async () => {
  const redisSubscriber = new Redis();

  redisSubscriber.on('message', (channel, message) => {
    // channel format -> chat:${userId}:${receiverId}
    const [ _, senderId, receiverId ] = channel.split(':');

    sendMessage(senderId, receiverId, message);
  });

  // Subscribe to all Redis chat channels
  redisSubscriber.psubscribe('chat:*');
};

export const redisPublish = async (channel: string | Buffer, message: string | Buffer) => {
  return redis.publish(channel, message);
};
