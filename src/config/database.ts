import mongoose, { Mongoose } from "mongoose";

const dbConnect = async () => {
  try {
    const connected: Mongoose = await mongoose.connect(
      process.env.MONGODB_CONNECTION as string
    );
    console.log(`MongoDB Connected: ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default dbConnect;