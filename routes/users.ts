import express from "express";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

export const userRoute = express.Router();

// userRoute.get("/me", verifyToken, testingRoute);
userRoute.get("/get-users", verifyAdmin, getAllUsers);
userRoute.get("/get-user-by-id/:id", verifyToken, getUserById);
userRoute.delete("/delete/:id", verifyUser, deleteUser);
userRoute.put("/update-user/:id", verifyUser, updateUser);
