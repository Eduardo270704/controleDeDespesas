import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env file");
}

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("connected"));
  mongoose.connection.on("open", () => console.log("open"));
  mongoose.connection.on("disconnected", () => console.log("disconnected"));
  mongoose.connection.on("reconnected", () => console.log("reconnected"));
  mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
  mongoose.connection.on("close", () => console.log("close"));

  mongoose
    .connect(uri, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    })
    .then(() => console.log("Connected to database"))
    .catch((e) => {
      console.error("Error connecting to database", e.message);
    });

  process.on("SIGINT", async () => {
    try {
      console.log("Disconnecting from database");
      await mongoose.connection.close;
      process.exit(0);
    } catch (error) {
      console.log("Error disconnecting from database", error);
      process.exit(1);
    }
  });
};

export default connectDB;