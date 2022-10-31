import express from "express";
import "dotenv/config";
import { db_connection } from "./config/database";
import auth_route from "./routes/auth";
import { hotelRoute } from "./routes/hotel";
import { roomRoute } from "./routes/rooms";
import { userRoute } from "./routes/users";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleWare } from "./middleware/error.middleware";

const app = express();
const port = 5000;

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", auth_route);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);

app.use(errorMiddleWare);

app.listen(port, () => {
  db_connection();
  console.log("Server started on port " + port);
});
