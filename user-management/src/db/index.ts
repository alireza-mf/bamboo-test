import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.info("Database connected.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
