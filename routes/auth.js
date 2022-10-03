import express from "express";
const authRoute = express.Router();

authRoute.get("/", (req, res) => {
  res.send("we go auth");
});

export default authRoute;
