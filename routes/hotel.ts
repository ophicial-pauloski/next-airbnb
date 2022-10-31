import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
} from "../controllers/hotelController";
import { verifyAdmin } from "../utils/verifyToken";

export const hotelRoute = express.Router();

hotelRoute.post("/create-hotel", verifyAdmin, createHotel);
hotelRoute.get("/get-hotels", getAllHotels);
hotelRoute.get("/get-hotel-by-id/:id", getHotelById);
hotelRoute.delete("/delete/:id", verifyAdmin, deleteHotel);
hotelRoute.put("/update-hotel/:id", verifyAdmin, updateHotel);
