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
  res.send("<h1>Hello</h1>");
});
app.get("/images", async (req, res) => {
  // try {
  //   const response = await axios.get(
  //     "https://api.pexels.com/v1/search?query=house%20interior&per_page=20",
  //     {
  //       headers: {
  //         Authorization:
  //           "Bearer L4FHE5ZoZ2sdN01seGcJIFKVqW8DRCDG3OnLKocmEWAjFdXZNFixoOpz",
  //       },
  //     }
  //   );

  //   res.json(response.data);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
  const access_token =
    "L4FHE5ZoZ2sdN01seGcJIFKVqW8DRCDG3OnLKocmEWAjFdXZNFixoOpz";
  axios
    .get("https://api.pexels.com/v1/search?query=house interior&per_page=3", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
