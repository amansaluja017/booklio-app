import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI;

if (!mongodb_uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export const connectToDatabase = async (): Promise<void> => {
  try {
    const reponse = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB:", reponse.connection.host);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};
