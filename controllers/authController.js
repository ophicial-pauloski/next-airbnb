import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  const { email, username, password, country, city, phone } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  if (!email || !username || !password || !country || !city || !phone) {
    return res.status(400).json({
      success: false,
      message: "All field is required",
    });
  }

  try {
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
      const { password, ...data } = newUser._doc; //exclude password
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
