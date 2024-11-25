import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { messageRouter } from "./routers/message.routers.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connect } from "./db/index.js";
import { initializeSocket } from "./ws/index.js";
import { initializeSubscribers } from "./utils/queue.js";

const app = express();
await connect();
await initializeSubscribers();
initializeSocket();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/message', messageRouter);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
    console.log(`✅ Messaging service running on port "${process.env.PORT}"`);
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