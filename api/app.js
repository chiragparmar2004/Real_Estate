import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

import "dotenv/config";
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

console.log(process.env.CLIENT_URL);

app.use(express.json());
app.use(cookieParser());

app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);

app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.listen(5000, () => {
  console.log("server is running ");
});
