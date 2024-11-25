import redis from 'ioredis';

const client = redis.createClient();

client.on("connect", () => console.log("Connected to Redis."));
client.on("error", (err) => console.error("Redis error:", err));

export const setCache = async (key: string, data: Record<string, any>) => {
  client.setex(key, parseInt(process.env.CACHE_TIMER!), JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error setting cache:", err);
    }
  });
}

export const getCache = async (key: string) => {
  const value = await client.get(key);
  return value ? <Record<string, any>>JSON.parse(value) : null;
}

export const invalidateCache = async (key: string) => {
  return client.del(key);
}
