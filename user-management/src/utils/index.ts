import { Response } from "express";
import jwt from 'jsonwebtoken';
import { HttpStatus } from "../types/index.js";

export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: HttpStatus) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const responseSuccess = async <T extends Response>(res: T, data: Parameters<T["send"]>[0], status: HttpStatus = 200) => {
  res.status(status).json(data);
};

export const responseUnSuccess = async (res: Response, data: Record<string, string>, status: HttpStatus = 400) => {
  res.status(status).json(data);
};

export const generateJWTToken = (userId: string, username: string) => {
  return jwt.sign({ id: userId, username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};