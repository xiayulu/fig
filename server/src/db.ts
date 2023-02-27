import mongoose from "mongoose";
import logger from "./logger";

const DB_URI = "mongodb://root:example@localhost:27017/2215?authSource=admin";

async function connectDB() {
  try {
    const connection = await mongoose.connect(DB_URI)
    logger.info('DB connected');
    return connection
  } catch (error) {
    logger.error('Could not connect to db', error);
    process.exit(1);
  }
}

export default connectDB;