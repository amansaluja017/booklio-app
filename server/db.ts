import mongoose from "mongoose";
import { mongodbUri } from "./config/config";

export const connectToDatabase = async (): Promise<void> => {
  try {
    const reponse = await mongoose.connect(mongodbUri);
    console.log("Connected to MongoDB:", reponse.connection.host);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};
