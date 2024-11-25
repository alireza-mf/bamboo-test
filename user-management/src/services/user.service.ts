import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateJWTToken, HttpError } from '../utils/index.js';
import { HttpStatus } from '../types/index.js';

export const registerUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (user) {
    throw new HttpError("User exists.", HttpStatus.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return User.create({ username, password: hashedPassword });
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError("Invalid credentials.", HttpStatus.BAD_REQUEST);
  }

  const token = generateJWTToken(user.id, username);
  return { user, token };
};