import mongoose from "mongoose";

const { DB_HOST } = process.env;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("DB connected successfuly");
  } catch (error) {
    console.log(error);
  }
};
