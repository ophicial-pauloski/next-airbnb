/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password, country, city, phone } = await req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  if (!email || !username || !password || !country || !city || !phone) {
    return next(createError(404, "All field is required"));
  }

  try {
    //check if user alredy exist with email
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return next(createError(404, "User already exit"));
    }

    //create new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hash,
      country,
      city,
      phone,
    });

    await newUser.save();

    if (newUser) {
      const { password, ...data } = newUser["_doc"]; //exclude password
      res.status(201).json({
        message: "user created Successfully",
        success: true,
        data: data,
      });
    }
  } catch (error) {
    next(error);
  }
};

// login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(404, "provide all fields"));
  }

  try {
    //check for user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(createError(401, "User not found!"));
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or email address"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...data } = user["_doc"];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User login successfully",
        data: data,
      });
  } catch (error) {
    next(error);
  }
};
