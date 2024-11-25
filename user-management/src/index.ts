import express from "express";
import dotenv from 'dotenv';
import { userRouter } from "./routers/user.routers.js"; "./routers/user.routers.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connect } from "./db/index.js";
dotenv.config();

const app = express();
await connect()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
    console.log(`✅ User service running on port "${process.env.PORT}"`);
});

// graceful close
const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
} as const;
Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    console.info(`Process received a ${signal} signal.`);
    if (server) {
      server.close(() => {
          console.info("Server closed.");
      });
    }

    process.exit(1);
  });
});