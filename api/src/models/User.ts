import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 5,
      maxlength: 90,
    },
    address: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
