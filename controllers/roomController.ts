import { HotelModel } from "../models/hotel";
import { RoomModel } from "../models/Room";
import { Request, Response, NextFunction } from "express";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hotelId = req.params.id;
  const newRoom = new RoomModel(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json({
      success: true,
      message: "Room created successfully",
      data: savedRoom,
    });
  } catch (error) {
    next();
  }
};

// ******** Update Room *********//
export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedRoom = await RoomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// *********** Delete Room ***********//
export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);

    try {
      await HotelModel.findByIdAndUpdate(req.params.id, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room deleted successfully");
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ********************* Get all Rooms ***************//
export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Rooms = await RoomModel.find();
    res.status(200).json(Rooms);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ************************** Get Room By Id ********************//
export const getRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getRoom = await RoomModel.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//
