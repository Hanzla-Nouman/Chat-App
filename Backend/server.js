import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToDb from "./db/connectToDb.js";

import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT ;


app.use(express.json());// to parse the incoming request with JSON payload (from req.body)
app.use(cookieParser());// to parse the incoming request with
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   // root route http://localhost:5000/
//   res.send("Hello World");
// });

app.listen(PORT, () => {
  connectToDb();
  console.log(`App listening on port ${PORT}`);
});
