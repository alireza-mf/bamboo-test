import { findMessages } from '../services/message.service.js';
import { getCache, redisPublish, responseSuccess } from '../utils/index.js';
import { HttpStatus, ICreateMessageApi, IGetMessagesApi } from '../types/index.js';

export const createMessage = <ICreateMessageApi>(async (req, res) => {
  const { userId } = req;
  const { receiverId, content } = req.body;

  // publish to redis as a load balancer
  await redisPublish(`chat:${userId}:${receiverId}`, content);

  return responseSuccess(res, {}, HttpStatus.CREATED);
});

export const getMessages = <IGetMessagesApi>(async (req, res) => {
  const { userId } = req;
  const { senderId } = req.params;

  const isCached = await getCache(`chat:${senderId}:${userId}`)
  if (isCached) {
    return responseSuccess(res, { messages: isCached }, HttpStatus.SUCCESS);
  }

  const messages = await findMessages(senderId, userId);

  return responseSuccess(res, { messages }, HttpStatus.SUCCESS);
});