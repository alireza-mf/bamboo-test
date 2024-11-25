import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
