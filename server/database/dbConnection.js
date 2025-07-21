import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const dbConnection = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  const DB_NAME = process.env.DB_NAME || "authentication";

  if (!MONGO_URI) {
    logger.error(" MONGO_URI not defined in environment variables.");
    process.exit(1);
  }

  try {
    const { connection } = await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
    });

    logger.info(`MongoDB connected: ${connection.host}`);
  } catch (err) {
    logger.error("Failed to connect to MongoDB.");
    logger.error(`Error Message: ${err.message}`);
    logger.error(`Stack Trace: ${err.stack}`);
    process.exit(1);
  }
};
