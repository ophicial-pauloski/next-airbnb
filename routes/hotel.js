import express from "express";
import { createHotel, deleteHotel, getAllHotels, getHotelById, updateHotel } from "../controllers/hotelController.js";

export const hotelRoute = express.Router();

hotelRoute.post("/create-hotel", createHotel);
hotelRoute.get("/get-hotels", getAllHotels);
hotelRoute.get("/get-hotel-by-id/:id", getHotelById);
hotelRoute.delete("/delete/:id", deleteHotel);
hotelRoute.put("/update-hotel/:id", updateHotel);
