import express from "express";
import dotenv from "dotenv";
import { db_connection } from "./config/database.js";
import auth_route from "./routes/auth.js";
import { hotelRoute } from "./routes/hotel.js";
import { roomRoute } from "./routes/rooms.js";
import { userRoute } from "./routes/users.js";

dotenv.config();

const app = express();
const port = 2000;

//middlewares
app.use(express.json());
app.use("/api/auth", auth_route);
app.use("/api/hotel", hotelRoute);
app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    staack: err.staack,
  });
});

app.listen(port, (req, res) => {
  db_connection();
  console.log("connecting to port " + port);
});
