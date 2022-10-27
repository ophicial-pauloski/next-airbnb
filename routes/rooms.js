import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

export const roomRoute = express.Router();

roomRoute.get("/get-rooms", getAllRooms);
roomRoute.get("/get-room-by-id/:id", getRoomById);
roomRoute.delete("/delete/:id", verifyAdmin, deleteRoom);
roomRoute.put("/update-room/:id", verifyAdmin, updateRoom);
roomRoute.post("/create-room/:id", verifyAdmin, createRoom);
