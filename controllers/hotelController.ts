import { HotelModel } from "../models/hotel";
import { Request, Response, NextFunction } from "express";

// *************************Create Hotel **************************//
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newHotel = new HotelModel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ******** Update Hotel *********//
export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// *********** Delete Hotel ***********//
export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel deleted successfully");
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ********************* Get all Hotels ***************//
export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ************************** Get Hotel By Id ********************//
export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getHotel = await HotelModel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//
