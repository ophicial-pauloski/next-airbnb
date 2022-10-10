import express from "express";
import { verifyAdmin, verifyToken, verifyUser } from "./../utils/verifyToken.js";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

export const userRoute = express.Router();

userRoute.get("/get-users", verifyAdmin, getAllUsers);
userRoute.get("/get-user-by-id/:id", getUserById);
userRoute.delete("/delete/:id", verifyUser, deleteUser);
userRoute.put("/update-user/:id", verifyUser, updateUser);

userRoute.get("/get-u", verifyAdmin, (req, res, next) => {
  res.send("get you yooooo😂😂😂");
});
