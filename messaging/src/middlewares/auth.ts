import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../types/index.js';
import { responseUnSuccess } from '../utils/index.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return responseUnSuccess(res, { message: 'Authentication token is missing or invalid.' }, HttpStatus.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; };
    req.userId =  decoded.id;
    next();
  } catch (error) {
    return responseUnSuccess(res, { message: 'Invalid or expired token.' }, HttpStatus.UNAUTHORIZED);
  }
};