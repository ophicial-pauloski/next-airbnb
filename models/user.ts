import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  country: string;
  img: string;
  phone: string;
  city: string;
  isAdmin: boolean;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("users", UserSchema);
