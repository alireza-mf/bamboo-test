declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: string;
      SOCKET_PORT: string;
      CACHE_TIMER: string;
    }
  }

  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export {};