import express from "express";
import { loginUser, register } from "../controllers/authController";
const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login", loginUser);

export default authRoute;
