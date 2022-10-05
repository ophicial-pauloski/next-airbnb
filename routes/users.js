import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

export const userRoute = express.Router();

userRoute.get("/get-users", getAllUsers);
userRoute.get("/get-user-by-id/:id", getUserById);
userRoute.delete("/delete/:id", deleteUser);
userRoute.put("/update-user/:id", updateUser);
