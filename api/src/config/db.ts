import mongoose from "mongoose";
import {dev}  from "./index";

const connectDB = async () => {
  try {
    await mongoose.connect(dev.db.mongoUrl);
    console.log("database is connected");
  } catch (error:any) {
    console.log("database is not connected");
    console.log(error.message);
    process.exit(1);
  }
};
export default connectDB;
