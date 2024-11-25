import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/message.controller.js';
import { authenticate } from '../middlewares/auth.js';

export const messageRouter = Router();

messageRouter.post('/', authenticate, createMessage);
messageRouter.get('/:senderId', authenticate, getMessages);
