import express from "express";
import cors from "cors";
import axios from "axios";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

import "dotenv/config";
import apiRequest from "../client/src/lib/apiRequest.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

console.log(process.env.CLIENT_URL);

app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.get("/", (req, res) => {
  res.send("<h1>Hello There this is backend of chirag project</h1>");
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
