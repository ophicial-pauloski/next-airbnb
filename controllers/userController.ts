import { UserModel } from "../models/user";
import { Request, Response, NextFunction } from "express";

// ******** Update User *********//
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// *********** Delete User ***********//
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ********************* Get all Users ***************//
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Users = await UserModel.find().select("-password");
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//

// ************************** Get User By Id ********************//
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getUser = await UserModel.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (error) {
    next(error);
  }
};
// *******************************************************//
