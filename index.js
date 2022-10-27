import express from "express";
import dotenv from "dotenv";
import { db_connection } from "./config/database.js";
import auth_route from "./routes/auth.js";
import { hotelRoute } from "./routes/hotel.js";
import { roomRoute } from "./routes/rooms.js";
import { userRoute } from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleWare } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
const port = 2000;

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", auth_route);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);

app.use(errorMiddleWare);

app.listen(port, (req, res) => {
  db_connection();
  console.log("Server started on port " + port);
});
