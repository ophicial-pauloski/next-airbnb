import { RoomModel } from "../models/Room.js";
import { RoomModel } from "../models/room.js";

export const createRoom = async (req, res, next) => {
  const roomId = req.params.roomId;
  const newRoom = new RoomModel.create(req.body);

  try {
    const savedRoom = await newRoom.save();

    //set just created room id to Room rooms
    await RoomModel.findByIdAndUpdate(roomId, {
      $push: { rooms: savedRoom._id },
    });

    res.status(200).json({
      success: true,
      message: "Room created successfully",
      savedRoom,
    });
  } catch (error) {
    next();
  }
};


// ******** Update Room *********//
export const updateRoom = async (req, res, next) => {
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
export const deleteRoom = async (req, res, next) => {
  try {
    await RoomModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted successfully");
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ********************* Get all Rooms ***************//
export const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await RoomModel.find();
    res.status(200).json(Rooms);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ************************** Get Room By Id ********************//
export const getRoomById = async (req, res, next) => {
  try {
    const getRoom = await RoomModel.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

